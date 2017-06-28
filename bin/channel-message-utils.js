"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_encoding_utf_8_1 = require("text-encoding-utf-8");
var ChannelMessageUtils = (function () {
    function ChannelMessageUtils() {
    }
    ChannelMessageUtils.serializeControlMessage = function (requestId, type, details, binaryPortion) {
        var controlMessage = {
            type: type,
            details: details
        };
        if (requestId) {
            controlMessage.requestId = requestId;
        }
        var messageInfo = {
            channelCode: 0,
            senderCode: 0,
            history: false,
            priority: false,
            jsonMessage: controlMessage,
            binaryPayload: binaryPortion
        };
        return this.serializeChannelMessage(messageInfo, 0, 0);
    };
    ChannelMessageUtils.serializeChannelMessage = function (messageInfo, lastTimestampSent, clockSkew) {
        // Allocate the proper length...
        var jsonPayloadBuffer;
        var length = this.MESSAGE_HEADER_LENGTH;
        if (messageInfo.jsonMessage) {
            length += 4;
            if (messageInfo.jsonMessage) {
                jsonPayloadBuffer = new text_encoding_utf_8_1.TextEncoder().encode(JSON.stringify(messageInfo.jsonMessage));
                length += jsonPayloadBuffer.byteLength;
            }
        }
        if (messageInfo.binaryPayload) {
            length += messageInfo.binaryPayload.byteLength;
        }
        var result = new Uint8Array(length);
        var view = new DataView(result.buffer);
        // Populate the header...
        var timestamp = Date.now() + clockSkew;
        if (timestamp <= lastTimestampSent) {
            timestamp = lastTimestampSent + 1;
        }
        view.setUint16(0, this.CHANNEL_ELEMENTS_VERSION_V1);
        var topTime = Math.floor(timestamp / (Math.pow(2, 32)));
        view.setUint16(2, topTime);
        var remainder = timestamp - (topTime * Math.pow(2, 32));
        view.setUint32(4, remainder);
        view.setUint32(8, messageInfo.channelCode ? messageInfo.channelCode : 0);
        view.setUint32(12, messageInfo.senderCode ? messageInfo.senderCode : 0);
        var behavior = 0;
        if (messageInfo.priority) {
            behavior |= 0x01;
        }
        if (messageInfo.history) {
            behavior |= 0x02;
        }
        view.setUint8(16, behavior);
        result.fill(0, 17, this.MESSAGE_HEADER_LENGTH);
        // Now the payload...
        var offset = this.MESSAGE_HEADER_LENGTH;
        if (jsonPayloadBuffer) {
            view.setUint32(offset, jsonPayloadBuffer.byteLength);
            offset += 4;
            result.set(jsonPayloadBuffer, offset);
            offset += jsonPayloadBuffer.byteLength;
        }
        if (messageInfo.binaryPayload) {
            result.set(messageInfo.binaryPayload, offset);
        }
        return result;
    };
    ChannelMessageUtils.parseChannelMessage = function (message, enforceClockSync) {
        if (enforceClockSync === void 0) { enforceClockSync = true; }
        var result = {
            valid: false,
            rawMessage: message
        };
        if (message.length < this.MESSAGE_HEADER_LENGTH) {
            result.errorMessage = 'Message is too short';
            return result;
        }
        var view = new DataView(message.buffer, message.byteOffset);
        if (view.getUint16(0) !== this.CHANNEL_ELEMENTS_VERSION_V1) {
            result.errorMessage = 'Message prefix is invalid.  Incorrect protocol?';
            return result;
        }
        var topBytes = view.getUint16(2);
        var bottomBytes = view.getUint32(4);
        var timestamp = topBytes * Math.pow(2, 32) + bottomBytes;
        var delta = Date.now() - timestamp;
        if (enforceClockSync && Math.abs(delta) > 15000) {
            result.valid = false;
            result.errorMessage = "Clocks are too far out of sync, or message timestamp is invalid";
            return result;
        }
        var behavior = view.getUint8(16);
        var contents = {
            serializedMessage: message,
            timestamp: timestamp,
            channelCode: view.getUint32(8),
            senderCode: view.getUint32(12),
            priority: (behavior & 0x01) ? true : false,
            history: (behavior & 0x02) ? true : false,
            fullPayload: new Uint8Array(message.buffer, message.byteOffset + this.MESSAGE_HEADER_LENGTH, message.byteLength - this.MESSAGE_HEADER_LENGTH)
        };
        result.contents = contents;
        result.valid = true;
        if (contents.channelCode === 0 && contents.senderCode === 0) {
            var jsonLength = view.getUint32(this.MESSAGE_HEADER_LENGTH);
            try {
                var jsonString = new text_encoding_utf_8_1.TextDecoder("utf-8").decode(message.subarray(this.MESSAGE_HEADER_LENGTH + 4, this.MESSAGE_HEADER_LENGTH + 4 + jsonLength));
                contents.controlMessagePayload = {
                    jsonMessage: JSON.parse(jsonString)
                };
                if (message.byteLength > this.MESSAGE_HEADER_LENGTH + 4 + jsonLength) {
                    contents.controlMessagePayload.binaryPortion = new Uint8Array(contents.fullPayload.buffer, contents.fullPayload.byteOffset + 4 + jsonLength, contents.fullPayload.byteLength - 4 - jsonLength);
                }
            }
            catch (err) {
                result.valid = false;
                result.errorMessage = "Invalid control message payload";
            }
        }
        return result;
    };
    return ChannelMessageUtils;
}());
ChannelMessageUtils.MESSAGE_HEADER_LENGTH = 32;
ChannelMessageUtils.CHANNEL_ELEMENTS_VERSION_V1 = 0xCEB1;
exports.ChannelMessageUtils = ChannelMessageUtils;
//# sourceMappingURL=channel-message-utils.js.map
"use strict";
class DefaultValidator {
    /**
     * Check if session is valid. A session is "valid" if the user connected has the right to use the bot.
     * This DefaultValidator compare session.message.address.conversation.id to an env parameter.
     *
     * @param {builder.Session} session
     * @returns {Boolean} true if session is valid.
     *
     * @memberOf DefaultValidator
     */
    validate(session) {
        if (process.env.SESSION_ID) {
            return session.message.address.conversation.id === process.env.SESSION_ID;
        }
        else {
            return true;
        }
    }
}
exports.DefaultValidator = DefaultValidator;
//# sourceMappingURL=validator.js.map
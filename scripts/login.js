/**
 * Login POST Request
 */

module.exports = {
    validVal: Boolean,
    getValidUser: () => {
        return this.validVal;
    },
    setValidUser: (valid) => {
        this.validVal = valid
    }
}
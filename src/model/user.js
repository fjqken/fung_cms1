import _axios from '../axios/axios'

export default class User {
    static async getToken(account, password, captcha, tag) {
        return _axios({
            url: 'xdeas-user-v2/account/terminal/loginByAccount',
            method: 'POST',
            data: {
                captcha,
                account,
                password,
            },
            headers: {
                tag,
            },
        });
        // saveTokens(tokens.access_token, tokens.refresh_token)
        // console.log(tokens)
        // console.log(tokens.data + '11111')
        // return tokens.data
    }

    static async login_code(code_body) {
        return await _axios({
            url: '/xdeas_api/xdeas-user-v2/account/terminal/loginByPhone',
            method: 'POST',
            data: {
                "phone": code_body.phone,
                "code": code_body.code
            }
        })
    }

    static async get_phone_code(businessType, phone, tag) {
        await _axios({
            url: '/xdeas-user-v2/account/terminal/sendValidCodeByPhone',
            method: 'POST',
            data: {
                businessType,
                phone
            },
            headers: {
                tag,
            },
        })
    }
}

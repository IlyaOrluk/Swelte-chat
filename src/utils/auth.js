import axios from 'axios'
import { goto } from '@sapper/app'

const apiBase = 'http://127.0.0.1:8000/'
const url = (path) => apiBase+path
export const login = (username, password) => {
    axios.post(url('auth/jwt/create/'),
        {
            "username": `${username}`,
            "password": `${password}`
        }
    )
        .then(res => {
            if(res.status === 200) {
                console.log(res.data.access)
                localStorage.setItem('Token', res.data.access);
                goto('/me')
            } else if(res.status === 401) {
                alert('invalid username or password')
            }
        })

}

export const register = async (email, username, password) => {
   await axios.post(url('auth/users/'),
        {
            "email": `${email}`,
            "username": `${username}`,
            "password": `${password}`
        }
    )

    await login(username, password)
}

export const changeAvatar = (avatar) => {
    axios.post('http://127.0.0.1:8000/api/user-avatar/', {
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem('Token')}`
        }
    },
    {
        'avatar': `${avatar}`
    }
    ).then(response => {
        console.log(response, 'avatar');
    }).catch((error) => {
        console.error('Error:', error);
    });
}

export const confirm = async (token) => {
    let res = await axios.get(url('auth/users/me/'),
            {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            }
        )
        .catch(() => {
            localStorage.removeItem('Token')
            goto('/')
            console.log('redirect')
        })

    return { res }
}
export const logout = () => {
    localStorage.removeItem('Token')
    goto('/')
    console.log('logout')
}
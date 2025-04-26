const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function loginMyUserApi(user) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/my/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            return {
                success: true,
                message: 'Login success',
                user: data.user
            };
        } else {
            return {
                success: false,
                message: data.message || 'falsed login'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'error: ' + error.message
        };
    }
}

export async function registerMyUserApi(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/my/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Nếu đăng ký đồng thời đăng nhập luôn, lưu token
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            return {
                success: true,
                message: data.message || 'Đăng ký thành công',
                user: data.user
            };
        } else {
            return {
                success: false,
                message: data.message || 'Đăng ký thất bại'
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Lỗi kết nối: ' + error.message
        };
    }
}
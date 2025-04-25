
export function isAuthenticated() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false;
    }
    
    // Kiểm tra xem token có phải là JWT và có thể giải mã được không
    try {
        // Giải mã phần payload của JWT (phần thứ hai sau dấu .)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        // Kiểm tra thời hạn của token
        const currentTime = Date.now() / 1000; // Chuyển đổi milliseconds sang seconds
        
        // Nếu payload không có exp hoặc thời gian hiện tại vượt quá exp
        if (!payload.exp || currentTime > payload.exp) {
            // Token đã hết hạn, xóa khỏi localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return false;
        }
        
        return true;
    } catch (error) {
        // Nếu có lỗi khi giải mã token, xóa token và trả về false
        console.error('Token không hợp lệ:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
    }
}
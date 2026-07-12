<template>
    <div v-if="showDialog" class="quick-login-overlay" @click="closeDialog">
        <div class="quick-login-card" @click.stop>
            <div class="quick-login-header">
                <h3>快速登录</h3>
                <button class="close-btn" @click="closeDialog">&times;</button>
            </div>
            <div class="quick-login-body">
                <div class="form-group">
                    <label>昵称</label>
                    <input v-model="form.username" type="text" placeholder="给自己起一个昵称（首次登录需要）"
                        :class="{ 'error': errors.username }">
                    <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
                </div>
                <div class="form-group">
                    <label>邮箱</label>
                    <input v-model="form.email" type="email" placeholder="请输入邮箱" :class="{ 'error': errors.email }">
                    <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                    <label>验证码</label>
                    <input v-model="form.captcha" type="text" placeholder="请输入验证码" :class="{ 'error': errors.captcha }">
                    <el-image :src="captchaImg" @click="getCaptcha" class="captcha-img" />
                    <span v-if="errors.captcha" class="error-text">{{ errors.captcha }}</span>
                </div>
                <button class="submit-btn" @click="handleSubmit" :disabled="loading">
                    {{ loading ? '登录中...' : '登录' }}
                </button>
                <div class="login-tip">
                    首次登录将自动完成注册
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import api from '../../api'
import { ElMessage } from 'element-plus'

const store = useStore()
const emit = defineEmits(['success', 'cancel'])

// 存储需要重试的请求配置
let captchaTimer = null // 验证码定时器
let pendingAction = null // 存储登录成功后需要执行的操作

const showDialog = ref(false) // 默认不显示
const loading = ref(false)
const captchaImg = ref(null) // 验证码图片
const isLogin = ref(true) // 默认为登录模式

const form = reactive({
    username: '',
    email: '',
    captcha: '',
    uuid: ''
})

const errors = reactive({
    username: '',
    email: '',
    captcha: ''
})

// 监听显示登录弹窗的事件
const handleShowQuickLogin = (event) => {
    // 如果弹窗已经显示，不重复处理
    if (showDialog.value) {
        return
    }
    
    // 检查是否有自定义数据
    if (event.detail && event.detail.action) {
        pendingAction = event.detail.action
    } else {
        pendingAction = null
    }
    
    showDialog.value = true
    // 显示弹窗时立即获取验证码
    getCaptcha(true)
    // 启动定时器
    startCaptchaTimer()
}

const validateForm = () => {
    let isValid = true
    errors.username = ''
    errors.email = ''
    errors.captcha = ''

    if (!form.email) {
        errors.email = '请输入邮箱'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = '请输入正确的邮箱格式'
        isValid = false
    }

    if (!form.captcha) {
        errors.captcha = '请输入验证码'
        isValid = false
    }

    return isValid
}

const closeDialog = () => {
    showDialog.value = false
    // 清除所有定时器
    clearCaptchaTimer()
    // 重置表单
    form.username = ''
    form.email = ''
    form.captcha = ''
    form.uuid = ''
    // 清除错误提示
    errors.username = ''
    errors.email = ''
    errors.captcha = ''
    emit('cancel')
}

// 获取验证码
let captchaTimeout = null
const getCaptcha = async (immediate = false) => {
    // 如果已经有请求在进行中，就取消之前的请求
    if (captchaTimeout) {
        clearTimeout(captchaTimeout)
    }

    // 如果弹窗没有显示，不获取验证码
    if (!showDialog.value) {
        return
    }

    const fetchCaptcha = async () => {
        try {
            const res = await api.getCaptcha()
            if (res.data.code === 20000) {
                const data = res.data.data
                captchaImg.value = data.captcha
                form.uuid = data.uuid
            }
        } catch (error) {
            console.error('获取验证码失败:', error)
            ElMessage.error('获取验证码失败，请重试')
        }
    }

    if (immediate) {
        // 立即执行
        await fetchCaptcha()
    } else {
        // 防抖延迟执行
        captchaTimeout = setTimeout(fetchCaptcha, 500)
    }
}

// 启动定时器
const startCaptchaTimer = () => {
    // 先清除可能存在的定时器
    clearCaptchaTimer()
    // 设置新的定时器
    captchaTimer = setInterval(() => {
        // 只有在弹窗显示时才更新验证码
        if (showDialog.value) {
            getCaptcha()
        }
    }, 1000 * 60 * 3) // 3分钟更新一次
}

// 清理定时器
const clearCaptchaTimer = () => {
    if (captchaTimer) {
        clearInterval(captchaTimer)
        captchaTimer = null
    }
    if (captchaTimeout) {
        clearTimeout(captchaTimeout)
        captchaTimeout = null
    }
}

const toggleMode = () => {
    isLogin.value = !isLogin.value
    // 切换模式时重置表单和错误信息
    form.username = ''
    form.email = ''
    form.captcha = ''
    errors.username = ''
    errors.email = ''
    errors.captcha = ''
    // 重新获取验证码
    getCaptcha(true)
}

/**
 * 提交登录表单
 * @returns {Promise<void>}
 */
const handleSubmit = async () => {
    if (!validateForm()) {
        return
    }
    loading.value = true
    try {
        const res = await api.login({
            username: form.username,
            email: form.email,
            captcha: form.captcha,
            uuid: form.uuid
        })

        if (res.data.code === 20000) {
            const userInfo = res.data.data
            store.commit("setUserInfo", userInfo)
            ElMessage.success('登录成功')
            showDialog.value = false
            emit('success')
            
            // 执行登录后的待处理操作
            if (pendingAction) {
                setTimeout(() => {
                    pendingAction()
                    pendingAction = null
                }, 500)
            }
        } else {
            ElMessage.error(res.data.message || '登录失败，请检查输入信息')
        }
    } catch (error) {
        console.error("登录失败:", error)
        return false
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    window.addEventListener('show-quick-login', handleShowQuickLogin)
})

onUnmounted(() => {
    window.removeEventListener('show-quick-login', handleShowQuickLogin)
    clearCaptchaTimer()
    if (captchaTimeout) {
        clearTimeout(captchaTimeout)
    }
})
</script>

<style scoped>
.quick-login-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.quick-login-card {
    background: hsl(0deg 0% 98.04%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 30px;
    width: 90%;
    max-width: 420px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.quick-login-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.quick-login-header h3 {
    margin: 0;
    color: #333;
    font-size: 24px;
    font-weight: 600;
}

.close-btn {
    background: none;
    border: none;
    font-size: 28px;
    color: #666;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.3s;
}

.close-btn:hover {
    color: #333;
}

.form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    /* 改为水平方向 */
    align-items: center;
    /* 垂直居中对齐 */
    gap: 12px;
    /* 添加间距 */
    position: relative;
    /* 添加相对定位 */
}

.form-group label {
    min-width: 45px;
    color: #333;
    font-size: 14px;
    font-weight: 600;
    text-align: right;
    flex-shrink: 0;
}

.form-group input {
    flex: 1;
    /* 让input占据剩余空间 */
    padding: 12px 16px;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.3s;
    background: #f8f8f8;
    box-sizing: border-box;
    /* 确保padding不会影响总宽度 */
}

.form-group input:focus {
    outline: none;
    border-color: #4a5a6b;
    background: #fff;
}

.form-group input.error {
    border-color: #ff6b6b;
    background: #fff;
}

/* 错误提示文本位置调整 */
.error-text {
    color: #ff6b6b;
    font-size: 13px;
    position: absolute;
    left: 82px;
    /* 新的label宽度(70px) + gap(12px) */
    bottom: -20px;
}

.captcha-img {
    width: 120px;
    /* 设置固定宽度 */
    height: 46px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid #e8e8e8;
    flex-shrink: 0;
    /* 防止图片被压缩 */
}

.submit-btn {
    width: 100%;
    padding: 14px;
    background: #4a5a6b;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background: #3d4b59;
}

.submit-btn:disabled {
    background: #a0a0a0;
    cursor: not-allowed;
}

.switch-mode {
    text-align: center;
    margin-top: 16px;
    color: #4a5a6b;
    font-size: 14px;
}

.switch-mode span {
    cursor: pointer;
    transition: color 0.3s;
}

.switch-mode span:hover {
    color: #3d4b59;
    text-decoration: underline;
}

.login-tip {
    text-align: center;
    margin-top: 16px;
    color: #666;
    font-size: 14px;
}

/* 移动端快速登录 */
@media screen and (max-width: 768px) {
    .quick-login-card {
        padding: 24px 20px;
        width: 92%;
        border-radius: 12px;
    }

    .quick-login-header h3 {
        font-size: 20px;
    }

    .form-group {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
    }

    .form-group label {
        min-width: auto;
        text-align: left;
        font-size: 13px;
    }

    .form-group input {
        width: 100%;
        padding: 10px 14px;
        font-size: 14px;
    }

    .error-text {
        left: 0;
        bottom: -18px;
    }

    .captcha-img {
        width: 100px;
        height: 40px;
    }

    .submit-btn {
        padding: 12px;
        font-size: 15px;
        margin-top: 16px;
    }

    .login-tip {
        font-size: 12px;
        margin-top: 12px;
    }
}
</style>

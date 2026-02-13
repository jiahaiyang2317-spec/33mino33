// 初始化全部功能
const initSpace = () => {
    // 1. 高考倒计时
    const gkDisplay = document.getElementById('gaokao');
    const target = new Date('2026-06-07T09:00:00').getTime();
    const updateGK = () => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff <= 0) {
            gkDisplay.innerHTML = "考试已开始，祝你金榜题名！";
            return;
        }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        gkDisplay.innerHTML = `还剩 <b>${d}</b>天 <b>${h}:${m}:${s}</b>`;
    };
    updateGK();
    setInterval(updateGK, 1000);
    // 2. 里程碑初次加载
    renderMilestone();
};
// 专注闹钟逻辑
let timeLeft = 1500;
let timerId = null;
function toggleTimer() {
    const btn = document.getElementById('startBtn');
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        btn.innerText = "继续专注";
    } else {
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                const m = Math.floor(timeLeft / 60);
                const s = timeLeft % 60;
                document.getElementById('timer').innerText = `${m}:${s < 10 ? '0' + s : s}`;
            } else {
                clearInterval(timerId);
                alert("专注时刻结束！");
                resetTimer();
            }
        }, 1000);
        btn.innerText = "暂停";
    }
}
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 1500;
    document.getElementById('timer').innerText = "25:00";
    document.getElementById('startBtn').innerText = "开始专注";
}
// 里程碑逻辑
function saveEvent() {
    const name = document.getElementById('evName').value;
    const date = document.getElementById('evDate').value;
    if (name && date) {
        localStorage.setItem('milestone_name', name);
        localStorage.setItem('milestone_date', date);
        renderMilestone();
    } else {
        alert("请填写完整的目标和日期");
    }
}
function renderMilestone() {
    const name = localStorage.getItem('milestone_name');
    const date = localStorage.getItem('milestone_date');
    const display = document.getElementById('customCountdown');
    if (name && date && display) {
        const diff = Math.ceil((new Date(date) - new Date()) / 86400000);
        display.innerHTML = `${name} 还有 <b>${diff}</b> 天`;
    }
}
// 页面加载完成后运行
window.addEventListener('DOMContentLoaded', initSpace);

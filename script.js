/**
 * 星铂再生资源 - 企业官网脚本 v3.0
 * 支持：JSON配置文件动态加载
 */

let siteData = null;

document.addEventListener('DOMContentLoaded', function() {
    // 加载配置数据
    loadSiteData();
    
    // 导航栏功能
    initNavigation();
    
    // 环保公示标签切换
    initEnvTabs();
    
    // 数字滚动动画
    initCounterAnimation();
    
    // 滚动显示动画
    initScrollAnimation();
    
    // 联系表单处理
    initContactForm();
    
    // 平滑滚动优化
    initSmoothScroll();
});

/**
 * 加载网站配置数据
 */
async function loadSiteData() {
    try {
        const response = await fetch('data.json');
        siteData = await response.json();
        
        // 渲染环保公示
        renderEnvNews();
        
        // 更新联系方式
        updateContactInfo();
        
        console.log('网站数据加载成功');
    } catch (error) {
        console.error('数据加载失败:', error);
    }
}

/**
 * 渲染环保公示列表
 */
function renderEnvNews() {
    if (!siteData || !siteData.环保公示) return;
    
    const newsList = document.getElementById('envNewsList');
    if (!newsList) return;
    
    // 清空现有内容
    newsList.innerHTML = '';
    
    // 生成新的环保公示列表
    siteData.环保公示.forEach(news => {
        const date = new Date(news.日期);
        const day = date.getDate();
        const monthYear = date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' }).replace('/', '-');
        
        const newsHTML = `
            <div class="env-news-item" data-category="${news.类型}">
                <div class="news-date">
                    <span class="date-day">${day}</span>
                    <span class="date-month">${monthYear}</span>
                </div>
                <div class="news-content">
                    <span class="news-tag ${news.类型}">${news.类型名称}</span>
                    <h4 class="news-title">${news.标题}</h4>
                    <p class="news-desc">${news.内容}</p>
                </div>
            </div>
        `;
        newsList.insertAdjacentHTML('beforeend', newsHTML);
    });
    
    // 重新绑定标签切换事件
    initEnvTabs();
}

/**
 * 更新联系方式
 */
function updateContactInfo() {
    if (!siteData || !siteData.联系方式) return;
    
    const contact = siteData.联系方式;
    
    // 更新电话
    const phoneEl = document.querySelector('.contact-info p');
    if (phoneEl && phoneEl.previousElementSibling?.querySelector('svg')) {
        const infoItems = document.querySelectorAll('.info-item > div:last-child p');
        if (infoItems[0]) infoItems[0].textContent = contact.电话;
        if (infoItems[1]) infoItems[1].textContent = contact.邮箱;
        if (infoItems[2]) infoItems[2].textContent = contact.地址;
        if (infoItems[3]) infoItems[3].textContent = contact.服务时间;
    }
}

/**
 * 导航栏功能
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // 点击导航链接关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // 滚动时更新导航状态
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        // 更新活动导航链接
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * 数字滚动动画
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-num');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * 滚动显示动画
 */
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.service-card, .product-card, .advantage-item, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * 联系表单处理
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // 简单验证
            if (!name || !phone || !message) {
                alert('请填写完整信息');
                return;
            }
            
            // 验证手机号格式
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('请输入正确的手机号码');
                return;
            }
            
            // 模拟提交（实际项目中替换为真实接口）
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '提交中...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('感谢您的留言！我们会尽快与您联系。');
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
}

/**
 * 环保公示标签切换（新闻列表分类筛选）
 */
function initEnvTabs() {
    const tabs = document.querySelectorAll('.env-tab');
    const newsList = document.getElementById('envNewsList');
    
    if (!newsList) return;
    
    const newsItems = newsList.querySelectorAll('.env-news-item');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-tab');
            
            // 更新标签状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选新闻列表
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (targetCategory === 'all' || itemCategory === targetCategory) {
                    item.classList.remove('hidden');
                    item.style.display = 'flex';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * 平滑滚动优化
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

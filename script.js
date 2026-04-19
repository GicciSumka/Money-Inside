document.addEventListener('DOMContentLoaded', () => {
    const $ = (id) => document.getElementById(id);

    const onboardingOverlay = $('onboardingOverlay');
    const roleButtons = document.querySelectorAll('.role-btn');
    const headerRole = $('headerRole');
    const screenTitle = $('screenTitle');

    const postsContainer = $('postsContainer');
    const popularPostsContainer = $('popularPostsContainer');
    const dailyTasksContainer = $('dailyTasksContainer');
    const hotOffersContainer = $('hotOffersContainer');
    const ordersContainer = $('ordersContainer');
    const btnCreateOrder = $('btnCreateOrder');
    const marketTitle = $('marketTitle');

    const paywallModal = $('paywallModal');
    const closeModalBtn = $('closeModal');
    const confirmPurchaseBtn = $('confirmPurchase');

    const contentView = $('contentView');
    const contentBody = $('viewContent');
    const backBtn = $('backBtn');

    const xpText = $('xpText');
    const levelBadge = $('levelBadge');
    const userBadgeTop = $('userBadgeTop');

    // Sidebar
    const menuBtn = $('menuBtn');
    const sidebar = $('sidebar');
    const sidebarOverlay = $('sidebarOverlay');
    const sidebarClose = $('sidebarClose');
    const sidebarRole = $('sidebarRole');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    // Profile
    const statsOpened = $('statsOpened');
    const statsViews = $('statsViews');
    const profileStatus = $('profileStatus');
    const buyPremiumProfile = $('buyPremiumProfile');
    const resetDataBtn = $('resetData');

    // Free views
    const freeViewsBanner = $('freeViewsBanner');
    const freeViewsRemainingLabel = $('freeViewsRemaining');

    // Beginner mode
    const beginnerModeToggle = $('beginnerModeToggle');

    // Feed calculator
    const levelButtons = document.querySelectorAll('#levelControl .segment-btn');
    const activitySelect = $('activityType');
    const workHoursRange = $('workHoursRange');
    const selectedHoursLabel = $('selectedHours');
    const estimatedIncomeLabel = $('estimatedIncome');
    const timeToResultLabel = $('timeToResult');
    const successRateFill = $('successRate');
    let selectedLevel = 'beginner';

    // Calculator page
    const pageLevelButtons = document.querySelectorAll('#pageLevelControl .segment-btn');
    const pageActivitySelect = $('pageActivityType');
    const pageWorkHoursRange = $('pageWorkHoursRange');
    const pageSelectedHoursLabel = $('pageSelectedHours');
    const pageEstimatedIncomeLabel = $('pageEstimatedIncome');
    const pageTimeToResultLabel = $('pageTimeToResult');
    const pageSuccessRateFill = $('pageSuccessRate');
    const pageSuccessPercentLabel = $('pageSuccessPercent');
    const forecastModeButtons = document.querySelectorAll('#forecastMode .mode-btn');
    const btnRecalc = $('btnRecalc');
    const calcHistoryList = $('calcHistory');
    let pageSelectedLevel = 'beginner';
    let selectedForecastMode = 'realistic';
    let calcHistory = JSON.parse(localStorage.getItem('calcHistory') || '[]');

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    // State
    let userRole = localStorage.getItem('userRole');
    let isPremium = localStorage.getItem('isPremium') === 'true';
    let userLevel = parseInt(localStorage.getItem('userLevel') || '1', 10);
    let userXP = parseInt(localStorage.getItem('userXP') || '0', 10);
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    let completedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
    let userBalance = parseFloat(localStorage.getItem('userBalance') || '0');
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    let openedPosts = JSON.parse(localStorage.getItem('openedPosts') || '[]');
    let totalViews = parseInt(localStorage.getItem('totalViews') || '0', 10);
    let tgShareCount = parseInt(localStorage.getItem('tgShareCount') || '0', 10);
    let isBeginnerMode = localStorage.getItem('isBeginnerMode') === 'true';

    const FREE_VIEWS_LIMIT = 3;
    const TG_FREE_LIMIT = 3;

    // Data
    const dailyTasks = [
        { id: 1, title: 'Отправить 1 отклик', xp: 20, minLevel: 1 },
        { id: 2, title: 'Зарегистрироваться на сервисе', xp: 15, minLevel: 1 },
        { id: 3, title: 'Найти и сохранить 1 заказ', xp: 30, minLevel: 2 },
        { id: 4, title: 'Сделать 1 быстрый отклик в Telegram', xp: 25, minLevel: 2 },
        { id: 5, title: 'Подготовить портфолио (шаблон)', xp: 40, minLevel: 3 }
    ];

    const hotOffers = [
        { id: 101, title: 'Срочный заказ: Логотип', profit: '$50', time: 7200 },
        { id: 102, title: 'Тестирование приложения', profit: '$15', time: 3600 },
        { id: 103, title: 'Новый клиент в Telegram', profit: '$30', time: 5400 }
    ];

    const demoOrders = [
        { 
            id: 201, 
            title: 'Подписаться на Telegram канал', 
            budget: '$5', 
            desc: 'Подпишись на канал @crypto_insights и получи $5', 
            minLevel: 1, 
            hot: true,
            type: 'telegram_sub',
            channelUrl: 'https://t.me/crypto_insights',
            verificationType: 'click_verify'
        },
        { 
            id: 202, 
            title: 'Написать комментарий', 
            budget: '$10', 
            desc: 'Оставь осмысленный комментарий под последним постом', 
            minLevel: 1, 
            hot: false,
            type: 'comment',
            verificationType: 'manual_review'
        },
        { 
            id: 203, 
            title: 'Пригласить 2 друзей', 
            budget: '$15', 
            desc: 'Пригласи 2 друзей в бота по твоей реферальной ссылке', 
            minLevel: 2, 
            hot: true,
            type: 'referral',
            requiredReferrals: 2,
            verificationType: 'auto_check'
        },
        { 
            id: 204, 
            title: 'Пройти опрос', 
            budget: '$3', 
            desc: 'Ответь на 5 вопросов о фрилансе', 
            minLevel: 1, 
            hot: false,
            type: 'survey',
            verificationType: 'complete_action'
        }
    ];

    const postsData = [
        {
            id: 'freelance',
            title: 'Фриланс: первые $100',
            desc: 'Пошаговый старт: профиль, портфолио, отклики.',
            tags: ['без вложений', 'новичкам'],
            views: '2.4k',
            isPremium: false,
            isNew: true,
            isPopular: true,
            content: {
                description: 'Фриланс — самый простой способ начать зарабатывать в интернете, используя текущие навыки или быстро освоив новые.',
                steps: [
                    'Выберите нишу (копирайтинг, дизайн или ассистирование)',
                    'Оформите профиль на <a href="https://kwork.ru" target="_blank" class="text-link-highlight">Kwork</a> или <a href="https://fl.ru" target="_blank" class="text-link-highlight">FL.ru</a>',
                    'Создайте 3 простых примера работ для портфолио',
                    'Откликайтесь минимум на 5 заказов ежедневно'
                ],
                profit: '$100 - $500 / мес',
                pros: ['Свободный график', 'Работа из дома'],
                cons: ['Нужна самодисциплина'],
                link: 'https://kwork.ru',
                messages: [
                    { label: 'Стандартный отклик', text: 'Здравствуйте! Заинтересовал ваш заказ. Готов выполнить качественно и в срок. Давайте обсудим детали?', isPremium: false },
                    { label: 'Креативный отклик (Premium)', text: 'Приветствую! Вижу ваш проект и уже знаю, как сделать его лучше. Предлагаю начать с мини-аудита и быстро дать результат. Когда удобно созвониться?', isPremium: true }
                ]
            }
        },
        {
            id: 'crypto',
            title: 'Аирдропы: смарт-заработок',
            desc: 'Как получать бесплатные токены от новых крипто‑проектов за простые действия.',
            tags: ['крипта', 'быстро'],
            views: '5.1k',
            isPremium: true,
            isNew: true,
            isPopular: true,
            content: {
                description: 'Крипто‑проекты выделяют часть токенов для ранних пользователей. Это шанс получить капитал с нуля.',
                steps: [
                    'Установите кошелёк <a href="https://metamask.io" target="_blank" class="text-link-highlight">MetaMask</a>',
                    'Следите за анонсами в каналах',
                    'Выполняйте задания в Zealy/Galxe',
                    'Взаимодействуйте с тестовыми сетями (testnets)'
                ],
                profit: '$50 - $5000 (зависит от проекта)',
                pros: ['Высокий потенциал', 'Минимум времени'],
                cons: ['Риск потратить время впустую'],
                link: 'https://metamask.io',
                messages: [
                    { label: 'Запрос на инвайт', text: 'Hey team! Love the project. Any chance to get early access/OG role? Wallet: [ваш адрес]', isPremium: false },
                    { label: 'Отклик амбассадора (Premium)', text: 'Hello! I have a community and can create tutorials/reviews for your ecosystem. Interested in an ambassador collaboration.', isPremium: true }
                ]
            }
        },
        {
            id: 'arbitrage',
            title: 'Арбитраж в Telegram',
            desc: 'Сливаем трафик на офферы через посевы в каналах. Разбор кейса.',
            tags: ['арбитраж', 'профи'],
            views: '3.8k',
            isPremium: true,
            isNew: false,
            isPopular: true,
            content: {
                description: 'Арбитраж трафика в Telegram — покупка рекламы в каналах для монетизации через партнёрские офферы.',
                steps: [
                    'Найдите оффер в CPA‑сети',
                    'Сделайте креатив',
                    'Купите тестовую рекламу',
                    'Масштабируйте связку'
                ],
                profit: 'от $1000 / мес',
                pros: ['Неограниченный рост', 'Автоматизация'],
                cons: ['Нужен стартовый бюджет'],
                link: 'https://m1.top',
                messages: [
                    { label: 'Запрос прайса', text: 'Здравствуйте! Интересует реклама в вашем канале. Подскажите актуальный прайс и свободные даты.', isPremium: false },
                    { label: 'Переговоры о скидке (Premium)', text: 'Добрый день! Готов забрать слот завтра со скидкой, если согласуем сейчас. Работаем?', isPremium: true }
                ]
            }
        }
    ];

    // Helpers
    function showToast(message) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }

    function showConfettiCelebration(totalXP) {
        // Create confetti container
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);
        
        // Create confetti pieces
        const colors = ['#ffd700', '#4facfe', '#4caf50', '#ff6b6b', '#a855f7'];
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.animationDelay = Math.random() * 2 + 's';
            piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiContainer.appendChild(piece);
        }
        
        // Create celebration overlay
        const overlay = document.createElement('div');
        overlay.className = 'celebration-overlay';
        overlay.innerHTML = `
            <div class="celebration-card">
                <div class="celebration-icon">🎉</div>
                <h2>Все задания выполнены!</h2>
                <p>Ты молодец! Сегодняшние задания успешно завершены.</p>
                <div class="celebration-xp">+${totalXP} XP</div>
                <button class="btn-celebration" onclick="this.closest('.celebration-overlay').remove(); document.querySelector('.confetti-container').remove();">
                    Круто! 🚀
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Auto-remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    function updateHeaderTitle(screenId) {
        if (!screenTitle) return;
        if (screenId === 'feedScreen') screenTitle.innerHTML = 'EarnHub | Инсайды <i class="fas fa-check-circle verified-icon"></i>';
        else if (screenId === 'popularScreen') screenTitle.innerText = 'Популярное';
        else if (screenId === 'freelanceScreen') screenTitle.innerText = 'Фриланс';
        else if (screenId === 'calculatorScreen') screenTitle.innerText = 'Калькулятор';
        else if (screenId === 'profileScreen') screenTitle.innerText = 'Профиль';
    }

    function showOnboardingIfNeeded() {
        if (!onboardingOverlay) return;
        if (!userRole) onboardingOverlay.style.display = 'flex';
        else onboardingOverlay.style.display = 'none';
    }

    function applyRoleUI() {
        if (headerRole) headerRole.innerText = userRole === 'freelancer' ? 'Фрилансер' : (userRole === 'employer' ? 'Работодатель' : 'Гость');
        if (sidebarRole) sidebarRole.innerText = userRole === 'freelancer' ? 'Фрилансер' : (userRole === 'employer' ? 'Работодатель' : 'Гость');
        if (!marketTitle || !btnCreateOrder) return;
        if (userRole === 'employer') {
            btnCreateOrder.style.display = 'inline-flex';
            marketTitle.innerText = 'Мои заказы';
        } else {
            btnCreateOrder.style.display = 'none';
            marketTitle.innerText = 'Биржа заказов';
        }
    }

    function updatePremiumUI() {
        if (!userBadgeTop) return;
        if (isBeginnerMode) {
            userBadgeTop.className = 'user-badge premium';
            userBadgeTop.innerText = 'PREMIUM';
        } else {
            userBadgeTop.className = 'user-badge standard';
            userBadgeTop.innerText = 'STANDARD';
        }
    }

    function updateLevelUI() {
        if (!xpText || !levelBadge) return;
        xpText.innerText = `${userXP}/100 XP`;
        const lvlText = levelBadge.querySelector('.lvl-text');
        const lvlFill = levelBadge.querySelector('.lvl-fill');
        if (lvlText) lvlText.innerText = `LVL ${userLevel}`;
        if (lvlFill) lvlFill.style.width = `${Math.min(100, userXP)}%`;
    }

    function addXP(xp) {
        userXP += xp;
        while (userXP >= 100) {
            userXP -= 100;
            userLevel += 1;
            showToast('🎉 Уровень повышен!');
        }
        localStorage.setItem('userXP', String(userXP));
        localStorage.setItem('userLevel', String(userLevel));
        updateLevelUI();
    }

    function completeOrder(orderId, budget) {
        if (completedOrders.includes(orderId)) return;
        
        // Parse budget (e.g., "$5" -> 5)
        const amount = parseFloat(budget.replace(/[^0-9.]/g, '')) || 0;
        
        // Add to completed orders
        completedOrders.push(orderId);
        localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
        
        // Add to balance
        userBalance += amount;
        localStorage.setItem('userBalance', String(userBalance));
        
        // Add XP
        addXP(Math.round(amount * 5)); // 5 XP per dollar
        
        // Show success
        showToast(`Задание выполнено! +${budget} 💰`);
        
        // Re-render orders
        renderOrders();
        
        // Show confetti for larger rewards
        if (amount >= 10) {
            const confettiContainer = document.createElement('div');
            confettiContainer.className = 'confetti-container';
            document.body.appendChild(confettiContainer);
            
            for (let i = 0; i < 30; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = Math.random() * 100 + '%';
                piece.style.animationDelay = Math.random() * 1 + 's';
                piece.style.backgroundColor = ['#ffd700', '#4caf50', '#4facfe'][Math.floor(Math.random() * 3)];
                confettiContainer.appendChild(piece);
            }
            
            setTimeout(() => confettiContainer.remove(), 4000);
        }
    }

    function updateViewsCounter() {
        if (isBeginnerMode) {
            if (freeViewsBanner) freeViewsBanner.style.display = 'none';
            return;
        }
        const remaining = Math.max(0, FREE_VIEWS_LIMIT - totalViews);
        if (freeViewsRemainingLabel) freeViewsRemainingLabel.innerText = remaining;
    }

    function updateProfile() {
        if (statsOpened) statsOpened.innerText = String(openedPosts.length);
        if (statsViews) statsViews.innerText = String(totalViews);
        
        // Update balance display
        const balanceElement = document.getElementById('userBalance');
        if (balanceElement) {
            balanceElement.innerText = '$' + userBalance.toFixed(2);
        }
        
        // Update completed orders count
        const statsOrders = document.getElementById('statsOrders');
        if (statsOrders) {
            statsOrders.innerText = String(completedOrders.length);
        }

        if (!profileStatus) return;
        if (isBeginnerMode) {
            profileStatus.innerText = 'Премиум доступ активен';
            profileStatus.className = 'status-badge premium';
            if (buyPremiumProfile) buyPremiumProfile.style.display = 'none';
        } else {
            profileStatus.innerText = 'Бесплатный пользователь';
            profileStatus.className = 'status-badge free';
            if (buyPremiumProfile) buyPremiumProfile.style.display = 'flex';
        }
    }

    function renderTasks() {
        if (!dailyTasksContainer) return;
        const available = dailyTasks.filter(t => t.minLevel <= userLevel);
        dailyTasksContainer.innerHTML = available
            .map(task => {
                const done = completedTasks.includes(task.id);
                return `
                    <div class="task-item ${done ? 'completed' : ''}">
                        <div class="task-info">
                            <h4>${task.title}</h4>
                            <span class="task-xp">+${task.xp} XP</span>
                        </div>
                        <button class="btn-task-done" onclick="window.app.completeTask(${task.id})">
                            ${done ? '✅' : 'Выполнил'}
                        </button>
                    </div>
                `;
            })
            .join('');
    }

    function renderHotOffers() {
        if (!hotOffersContainer) return;
        hotOffersContainer.innerHTML = hotOffers
            .map(offer => {
                return `
                    <div class="hot-card">
                        <div class="hot-timer" data-time="${offer.time}">
                            <i class="far fa-clock"></i>
                            <span class="timer-text">--:--:--</span>
                        </div>
                        <div class="hot-title">${offer.title}</div>
                        <div class="hot-profit">${offer.profit}</div>
                    </div>
                `;
            })
            .join('');
    }

    function getAllOrders() {
        const merged = [...demoOrders, ...orders];
        if (userRole === 'employer') return merged.filter(o => o.createdBy === 'employer');
        return merged;
    }

    function renderOrders() {
        if (!ordersContainer) return;
        const list = getAllOrders()
            .filter(order => (order.minLevel || 1) <= userLevel || isBeginnerMode)
            .slice(0, 20);

        ordersContainer.innerHTML = list
            .map(order => {
                const hotBadge = order.hot ? `<span class="post-hint">HOT • закроется скоро</span>` : '';
                const isCompleted = completedOrders.includes(order.id);
                const isPending = order.status === 'pending_review';
                
                let actionButton = '';
                if (isCompleted) {
                    actionButton = `<button class="btn-apply completed" disabled>✅ Выполнено</button>`;
                } else if (isPending) {
                    actionButton = `<button class="btn-apply pending" disabled>⏳ На проверке</button>`;
                } else {
                    // Different actions based on order type
                    if (order.type === 'telegram_sub') {
                        actionButton = `<button class="btn-apply" onclick="window.app.subscribeChannel(${order.id}, '${order.channelUrl}')">Подписаться</button>`;
                    } else if (order.type === 'comment') {
                        actionButton = `<button class="btn-apply" onclick="window.app.submitComment(${order.id})">Оставить комментарий</button>`;
                    } else if (order.type === 'referral') {
                        actionButton = `<button class="btn-apply" onclick="window.app.copyReferralLink(${order.id})">Пригласить друзей</button>`;
                    } else if (order.type === 'survey') {
                        actionButton = `<button class="btn-apply" onclick="window.app.takeSurvey(${order.id})">Пройти опрос</button>`;
                    } else {
                        actionButton = `<button class="btn-apply" onclick="window.app.completeOrder(${order.id})">Выполнить</button>`;
                    }
                }
                
                return `
                    <div class="order-card ${isCompleted ? 'completed' : ''}">
                        <div class="order-top">
                            <h4>${order.title}</h4>
                            <span class="order-budget">${order.budget}</span>
                        </div>
                        <p class="order-desc">${order.desc}</p>
                        ${hotBadge}
                        ${actionButton}
                    </div>
                `;
            })
            .join('');
    }

    function createPostCard(post, isLocked) {
        const hint = post.id === 'crypto' ? 'Этот способ принёс $120 вчера' : post.id === 'arbitrage' ? 'Один из самых прибыльных методов' : '';
        const cardClass = post.isPremium ? (isLocked ? 'premium' : 'premium unlocked') : '';
        return `
            <div class="post-card ${cardClass}" onclick="window.app.openPost('${post.id}')">
                ${isLocked ? `
                    <div class="spoiler-overlay" onclick="event.stopPropagation();">
                        <i class="fas fa-lock"></i>
                        <span>Доступно в Premium</span>
                    </div>
                ` : ''}
                <div class="post-header">
                    ${post.isNew ? '<span class="post-new-tag">NEW</span>' : '<span></span>'}
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <p class="post-desc">${post.desc}</p>
                ${hint ? `<span class="post-hint">${hint}</span>` : ''}
                <div class="post-footer">
                    <div class="post-stats">
                        <span><i class="far fa-eye"></i> ${post.views}</span>
                        <span><i class="far fa-clock"></i> 5 мин</span>
                    </div>
                    <button class="btn-open">Открыть</button>
                </div>
            </div>
        `;
    }

    function renderPosts() {
        if (!postsContainer) return;
        if (popularPostsContainer) popularPostsContainer.innerHTML = '';
        postsContainer.innerHTML = '';

        const filtered = postsData.filter(post => {
            return true;
        });

        filtered.forEach(post => {
            const isLocked = post.isPremium && !isBeginnerMode;
            postsContainer.insertAdjacentHTML('beforeend', createPostCard(post, isLocked));
            if (popularPostsContainer && post.isPopular) {
                popularPostsContainer.insertAdjacentHTML('beforeend', createPostCard(post, isLocked));
            }
        });
        updateViewsCounter();
    }

    function updateCalculator() {
        if (!workHoursRange || !selectedHoursLabel || !activitySelect || !estimatedIncomeLabel || !timeToResultLabel || !successRateFill) return;
        const hours = parseInt(workHoursRange.value, 10);
        selectedHoursLabel.innerText = String(hours);
        const activity = activitySelect.value;
        const levelMult = { beginner: 1, basic: 1.8, pro: 3.5 };
        const activityBase = { tasks: 150, freelance: 400, services: 850 };
        const base = activityBase[activity] * levelMult[selectedLevel];
        const minIncome = Math.round((base * (hours / 4)) * 0.8);
        const maxIncome = Math.round((base * (hours / 4)) * 1.2);
        estimatedIncomeLabel.innerText = `$${minIncome} - $${maxIncome}`;
        const times = { tasks: '1-2 дня', freelance: '5-7 дней', services: '10-14 дней' };
        timeToResultLabel.innerText = `~ ${times[activity]}`;
        let rate = 40;
        if (selectedLevel === 'beginner') rate += 40;
        if (activity === 'tasks') rate += 15;
        rate = Math.min(95, rate + (hours * 2));
        successRateFill.style.width = `${rate}%`;
        estimatedIncomeLabel.style.transform = 'scale(1.05)';
        setTimeout(() => (estimatedIncomeLabel.style.transform = 'scale(1)'), 100);
    }

    function updatePageCalculator() {
        if (!pageWorkHoursRange || !pageActivitySelect || !pageEstimatedIncomeLabel || !pageTimeToResultLabel || !pageSuccessRateFill || !pageSuccessPercentLabel) return;
        const hours = parseInt(pageWorkHoursRange.value, 10);
        const activity = pageActivitySelect.value;
        const levelMult = { beginner: 1, basic: 1.8, pro: 3.5 };
        const activityBase = { tasks: 150, freelance: 400, services: 850 };
        const modeMult = selectedForecastMode === 'optimistic' ? 1.4 : 1.0;
        const base = activityBase[activity] * levelMult[pageSelectedLevel] * modeMult;
        const minIncome = Math.round((base * (hours / 4)) * 0.8);
        const maxIncome = Math.round((base * (hours / 4)) * 1.2);
        pageEstimatedIncomeLabel.innerText = `$${minIncome} - $${maxIncome}`;
        const times = { tasks: '1-2 дня', freelance: '3-7 дней', services: '7-14 дней' };
        pageTimeToResultLabel.innerText = times[activity];
        let rate = 45;
        if (pageSelectedLevel === 'beginner') rate += 35;
        if (activity === 'tasks') rate += 10;
        if (selectedForecastMode === 'optimistic') rate -= 15;
        rate = Math.min(98, Math.max(10, rate + (hours * 1.5)));
        pageSuccessRateFill.style.width = `${rate}%`;
        pageSuccessPercentLabel.innerText = `${Math.round(rate)}%`;
    }

    function saveToHistory() {
        if (!pageActivitySelect || !pageEstimatedIncomeLabel) return;
        const entry = {
            id: Date.now(),
            activity: pageActivitySelect.options[pageActivitySelect.selectedIndex].text,
            income: pageEstimatedIncomeLabel.innerText,
            date: new Date().toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        calcHistory.unshift(entry);
        if (calcHistory.length > 5) calcHistory.pop();
        localStorage.setItem('calcHistory', JSON.stringify(calcHistory));
        renderHistory();
    }

    function openSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
    }

    function closeSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
    }

    function renderHistory() {
        if (!calcHistoryList) return;
        calcHistoryList.innerHTML = calcHistory
            .map(item => `
                <div class="history-item">
                    <div class="hist-meta">
                        <span class="hist-title">${item.activity}</span>
                        <span class="hist-date">${item.date}</span>
                    </div>
                    <span class="hist-profit">${item.income}</span>
                </div>
            `)
            .join('');
    }

    function openPost(postId) {
        closePaywall();
        const post = postsData.find(p => p.id === postId);
        if (!post || !contentBody || !contentView) return;


        if (!openedPosts.includes(postId)) {
            openedPosts.push(postId);
            totalViews += 1;
            localStorage.setItem('openedPosts', JSON.stringify(openedPosts));
            localStorage.setItem('totalViews', String(totalViews));
            updateViewsCounter();
            updateProfile();
        }

        const isContentLocked = post.isPremium && !isBeginnerMode;
        const stepsHtml = post.content.steps
            .map((step, index) => `
                <div class="step-item">
                    <div class="step-num">${index + 1}</div>
                    <div class="step-text">${step}</div>
                </div>
            `)
            .join('');

        const messagesHtml = post.content.messages
            .map(msg => {
                const safeText = msg.text.replace(/`/g, '\\`').replace(/\$/g, '\\$');
                return `
                    <div class="message-card">
                        <div class="msg-header">
                            <span>${msg.label}</span>
                            <i class="fas fa-copy" onclick="event.stopPropagation(); window.app.copyMessage(this.closest('.message-card'), \`${safeText}\`, false)"></i>
                        </div>
                        <div class="msg-text" onclick="window.app.copyMessage(this.closest('.message-card'), \`${safeText}\`, false)">${msg.text}</div>
                        <div class="copy-hint">Нажми на текст, чтобы скопировать</div>
                    </div>
                `;
            })
            .join('');

        contentBody.innerHTML = `
            <h1>${post.title}</h1>
            <div class="post-tags" style="margin-bottom: 16px;">
                ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>

            <div class="premium-reveal-container">
                <p class="${isContentLocked ? 'content-preview-text' : 'unfold-animation'}" style="color: var(--tg-text-secondary); line-height: 1.6; margin-bottom: 16px;">
                    ${post.content.description}
                </p>

                ${isContentLocked ? '' : `
                    <div class="full-content unfold-animation">
                        <h3>Пошаговый план:</h3>
                        <div class="steps-list" style="margin-top: 16px;">${stepsHtml}</div>

                        <div class="info-block profit">
                            <h4>💎 Ожидаемый доход</h4>
                            <p>${post.content.profit}</p>
                        </div>

                        <div class="info-grid">
                            <div class="grid-item">
                                <h5>Плюсы</h5>
                                <p style="color:#4caf50; font-size:0.85rem;">${post.content.pros.join(', ')}</p>
                            </div>
                            <div class="grid-item">
                                <h5>Минусы</h5>
                                <p style="color:#f44336; font-size:0.85rem;">${post.content.cons.join(', ')}</p>
                            </div>
                        </div>

                        <div style="margin-top:16px;">
                            <a href="${post.content.link}" target="_blank" class="link-btn">
                                <i class="fas fa-external-link-alt"></i> Открыть ресурс
                            </a>
                        </div>

                        <div class="ready-messages">
                            <h3>✉️ Готовые отклики</h3>
                            <div class="messages-grid">${messagesHtml}</div>
                        </div>
                    </div>
                `}
            </div>
        `;

        contentView.style.display = 'flex';
    }

    function openPaywall() {
        if (paywallModal) paywallModal.style.display = 'flex';
    }

    function closePaywall() {
        if (paywallModal) paywallModal.style.display = 'none';
    }

    // Window API
    window.app = {
        showToast,
        openPost,
        openPaywall,
        closeModal: closePaywall,
        switchScreen: (screenId) => {
            screens.forEach(s => s.classList.remove('active'));
            if (navItems && navItems.length) navItems.forEach(n => n.classList.remove('active'));
            const target = $(screenId);
            if (target) target.classList.add('active');
            sidebarItems.forEach(n => n.classList.remove('active'));
            const sb = document.querySelector(`.sidebar-item[data-screen="${screenId}"]`);
            if (sb) sb.classList.add('active');
            updateHeaderTitle(screenId);
        },
        completeTask: (taskId) => {
            if (completedTasks.includes(taskId)) return;
            const task = dailyTasks.find(t => t.id === taskId);
            if (!task) return;
            completedTasks.push(taskId);
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
            addXP(task.xp);
            renderTasks();
            
            // Check if all tasks completed
            const availableTasks = dailyTasks.filter(t => t.minLevel <= userLevel);
            const allCompleted = availableTasks.every(t => completedTasks.includes(t.id));
            
            if (allCompleted) {
                showConfettiCelebration(availableTasks.reduce((sum, t) => sum + t.xp, 0));
            }
        },
        subscribeChannel: (orderId, channelUrl) => {
            const order = getAllOrders().find(o => o.id === orderId);
            if (!order) return;
            
            // Open Telegram channel
            window.open(channelUrl, '_blank');
            
            // Show verification button after short delay
            setTimeout(() => {
                if (confirm('Вы подписались на канал? Подтвердите выполнение задания')) {
                    completeOrder(orderId, order.budget);
                }
            }, 2000);
        },
        
        submitComment: (orderId) => {
            const order = getAllOrders().find(o => o.id === orderId);
            if (!order) return;
            
            const comment = prompt('Введите текст вашего комментария:');
            if (!comment || comment.length < 5) {
                showToast('Комментарий слишком короткий');
                return;
            }
            
            // Mark as pending review
            order.status = 'pending_review';
            showToast('Комментарий отправлен на проверку ⏳');
            renderOrders();
        },
        
        copyReferralLink: (orderId) => {
            const order = getAllOrders().find(o => o.id === orderId);
            if (!order) return;
            
            const refLink = `https://t.me/earnhub_bot?start=ref_${Date.now()}`;
            navigator.clipboard.writeText(refLink).then(() => {
                showToast('Реферальная ссылка скопирована! 📋');
                showToast(`Пригласите ${order.requiredReferrals || 2} друзей`);
            });
            
            // Simulate referral tracking (in real app, this would be checked server-side)
            setTimeout(() => {
                completeOrder(orderId, order.budget);
            }, 3000);
        },
        
        takeSurvey: (orderId) => {
            const order = getAllOrders().find(o => o.id === orderId);
            if (!order) return;
            
            // Simple survey simulation
            const q1 = confirm('Вопрос 1: Вы уже работали на фрилансе?');
            const q2 = confirm('Вопрос 2: Готовы ли вы учиться?');
            const q3 = confirm('Вопрос 3: Есть ли у вас 2-3 часа в день?');
            
            if (q1 !== undefined && q2 !== undefined && q3 !== undefined) {
                completeOrder(orderId, order.budget);
            }
        },
        
        completeOrder: (orderId) => {
            const order = getAllOrders().find(o => o.id === orderId);
            if (!order) return;
            completeOrder(orderId, order.budget);
        },
        createOrder: () => {
            if (userRole !== 'employer') return;
            const title = prompt('Название заказа');
            if (!title) return;
            const budget = prompt('Бюджет (например $50)') || '$0';
            const desc = prompt('Описание задачи') || '';
            const newOrder = { id: Date.now(), title, budget, desc, minLevel: 1, hot: true, createdBy: 'employer' };
            orders.unshift(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrders();
            showToast('Заказ создан 🔥');
        },
        buyPremium: () => {
            if (!confirmPurchaseBtn) return;
            confirmPurchaseBtn.disabled = true;
            confirmPurchaseBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
            setTimeout(() => {
                isPremium = true;
                localStorage.setItem('isPremium', 'true');
                updatePremiumUI();
                updateProfile();
                closePaywall();
                confirmPurchaseBtn.disabled = false;
                confirmPurchaseBtn.innerHTML = 'Получить полный доступ';
                showToast('Premium активирован 👑');
                renderPosts();
                renderOrders();
            }, 1200);
        },
        copyMessage: (element, text, isLocked) => {
            if (isLocked) {
                showToast('Доступно только в Premium 🔒');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                if (element) element.classList.add('copy-anim');
                showToast('Текст скопирован ✅');
                setTimeout(() => {
                    if (element) element.classList.remove('copy-anim');
                }, 300);
            });
        },
        shareToTelegram: (element, text, isLocked) => {
            if (isLocked) {
                showToast('Доступно только в Premium 🔒');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                if (element) element.classList.add('copy-anim');
                showToast('Текст скопирован, открываем Telegram...');
                setTimeout(() => {
                    if (element) element.classList.remove('copy-anim');
                    const encodedText = encodeURIComponent(text);
                    window.open(`https://t.me/share/url?text=${encodedText}`, '_blank');
                }, 500);
            });
        }
    };

    // Events
    roleButtons.forEach(btn => {
        btn.onclick = () => {
            userRole = btn.dataset.role;
            localStorage.setItem('userRole', userRole);
            showOnboardingIfNeeded();
            applyRoleUI();
            renderOrders();
            showToast('Путь выбран ✅');
        };
    });

    if (navItems && navItems.length) {
        navItems.forEach(item => {
            item.onclick = () => window.app.switchScreen(item.dataset.screen);
        });
    }

    sidebarItems.forEach(item => {
        item.onclick = () => {
            window.app.switchScreen(item.dataset.screen);
            closeSidebar();
        };
    });

    if (menuBtn) menuBtn.onclick = openSidebar;
    if (sidebarClose) sidebarClose.onclick = closeSidebar;
    if (sidebarOverlay) sidebarOverlay.onclick = closeSidebar;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });

    if (backBtn) backBtn.onclick = () => (contentView.style.display = 'none');

    if (closeModalBtn) closeModalBtn.onclick = closePaywall;
    if (confirmPurchaseBtn) confirmPurchaseBtn.onclick = window.app.buyPremium;
    if (btnCreateOrder) btnCreateOrder.onclick = window.app.createOrder;
    if (buyPremiumProfile) buyPremiumProfile.onclick = openPaywall;

    if (resetDataBtn) {
        resetDataBtn.onclick = () => {
            if (confirm('Сбросить все данные приложения?')) {
                localStorage.clear();
                location.reload();
            }
        };
    }

    if (beginnerModeToggle) {
        beginnerModeToggle.checked = isBeginnerMode;
        beginnerModeToggle.onchange = () => {
            isBeginnerMode = beginnerModeToggle.checked;
            localStorage.setItem('isBeginnerMode', String(isBeginnerMode));
            
            // Animate unlock if switching to Premium
            if (isBeginnerMode) {
                const lockedCards = document.querySelectorAll('.post-card.premium');
                const overlays = document.querySelectorAll('.spoiler-overlay');
                const blurredDescs = document.querySelectorAll('.post-card.premium .post-desc');
                
                // Animate overlays fading out
                overlays.forEach(overlay => {
                    overlay.style.transition = 'opacity 0.3s ease, backdrop-filter 0.3s ease';
                    overlay.style.opacity = '0';
                    overlay.style.backdropFilter = 'blur(0px)';
                    overlay.style.pointerEvents = 'none';
                });
                
                // Remove blur from descriptions
                blurredDescs.forEach(desc => {
                    desc.style.transition = 'filter 0.3s ease';
                    desc.style.filter = 'blur(0px)';
                });
                
                // Quick re-render after animation
                setTimeout(() => {
                    renderPosts();
                    updateCalculator();
                    updatePremiumUI();
                }, 300);
            } else {
                renderPosts();
                updateCalculator();
                updatePremiumUI();
            }
        };
    }

    // Feed calculator listeners
    levelButtons.forEach(btn => {
        btn.onclick = () => {
            levelButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedLevel = btn.dataset.value;
            updateCalculator();
        };
    });
    if (activitySelect) activitySelect.onchange = updateCalculator;
    if (workHoursRange) workHoursRange.oninput = updateCalculator;

    // Calculator page listeners
    pageLevelButtons.forEach(btn => {
        btn.onclick = () => {
            pageLevelButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            pageSelectedLevel = btn.dataset.value;
            updatePageCalculator();
        };
    });
    forecastModeButtons.forEach(btn => {
        btn.onclick = () => {
            forecastModeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedForecastMode = btn.dataset.value;
            updatePageCalculator();
        };
    });
    if (pageActivitySelect) pageActivitySelect.onchange = updatePageCalculator;
    if (pageWorkHoursRange) {
        pageWorkHoursRange.oninput = () => {
            if (pageSelectedHoursLabel) pageSelectedHoursLabel.innerText = pageWorkHoursRange.value;
            updatePageCalculator();
        };
    }
    if (btnRecalc) {
        btnRecalc.onclick = () => {
            saveToHistory();
            updatePageCalculator();
            showToast('Расчёт обновлён 🔄');
        };
    }

    function formatTimer(sec) {
        const s = Math.max(0, sec);
        const h = Math.floor(s / 3600).toString().padStart(2, '0');
        const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
        const ss = Math.floor(s % 60).toString().padStart(2, '0');
        return `${h}:${m}:${ss}`;
    }

    function startTimers() {
        setInterval(() => {
            document.querySelectorAll('.hot-timer').forEach(timer => {
                const t = parseInt(timer.dataset.time || '0', 10);
                const textEl = timer.querySelector('.timer-text');
                if (t > 0) {
                    timer.dataset.time = String(t - 1);
                    if (textEl) textEl.innerText = formatTimer(t - 1);
                } else {
                    if (textEl) textEl.innerText = 'Истекло';
                    const card = timer.closest('.hot-card');
                    if (card) card.style.opacity = '0.5';
                }
            });
        }, 1000);
    }

    // Init
    showOnboardingIfNeeded();
    applyRoleUI();
    updatePremiumUI();
    updateLevelUI();
    updateViewsCounter();
    updateProfile();
    renderTasks();
    renderHotOffers();
    renderOrders();
    renderPosts();
    updateCalculator();
    updatePageCalculator();
    renderHistory();
    updateHeaderTitle('feedScreen');
    startTimers();
});

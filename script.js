
// --- DATA ---
const appData = {
    // ... (данные категорий и идей остаются без изменений)
    categories: {
        online: {
            name: "Онлайн",
            ideas: [
                { title: "Продажа цифровых продуктов", description: "Создавайте и продавайте электронные книги, курсы, шаблоны.", profit: "50-200к₽", time: "2-4ч" },
                { title: "Dropshipping", description: "Продавайте товары без их закупки.", profit: "30-150к₽", time: "3-5ч" },
                { title: "Арбитраж трафика", description: "Покупайте трафик дешевле и продавайте дороже.", profit: "40-300к₽", time: "4-6ч" },
                { title: "Консультации онлайн", description: "Проводите консультации по своей экспертизе.", profit: "30-100к₽", time: "2-3ч" },
                { title: "Создание сайтов", description: "Разрабатывайте сайты для малого бизнеса.", profit: "50-250к₽", time: "3-5ч" },
                { title: "Партнерский маркетинг", description: "Продвигайте чужие продукты и получайте комиссию.", profit: "20-150к₽", time: "2-4ч" },
            ]
        },
        social: {
            name: "TikTok / соцсети",
            ideas: [
                { title: "Монетизация TikTok", description: "Создавайте вирусный контент и зарабатывайте на рекламе.", profit: "20-500к₽", time: "2-3ч" },
                { title: "SMM-менеджмент", description: "Управляйте социальными сетями для бизнесов.", profit: "25-100к₽", time: "4-6ч" },
                { title: "Инфлюенсер-маркетинг", description: "Станьте микро-инфлюенсером и зарабатывайте на рекламе.", profit: "15-200к₽", time: "1-2ч" },
                { title: "Продажи в Instagram", description: "Создайте магазин в Instagram и продавайте товары.", profit: "30-150к₽", time: "3-5ч" },
                { title: "Ведение YouTube-канала", description: "Создавайте контент и зарабатывайте на рекламе.", profit: "20-300к₽", time: "4-6ч" },
            ]
        },
        noskills: {
            name: "Без навыков",
            ideas: [
                { title: "Онлайн-опросы", description: "Зарабатывайте на прохождении опросов и выполнении заданий.", profit: "5-25к₽", time: "2-4ч" },
                { title: "Перепродажа товаров", description: "Покупайте дешевле, продавайте дороже на Avito.", profit: "10-50к₽", time: "3-5ч" },
                { title: "Кликовые спонсоры", description: "Зарабатывайте на кликах по рекламе и просмотре видео.", profit: "3-15к₽", time: "1-2ч" },
                { title: "Транскрибация", description: "Переводите аудио и видео в текст.", profit: "10-40к₽", time: "3-5ч" },
                { title: "Тестирование сайтов", description: "Находите ошибки на сайтах и в приложениях.", profit: "15-60к₽", time: "2-4ч" },
            ]
        },
        quick: {
            name: "Быстрые деньги",
            ideas: [
                { title: "Фриланс-задания", description: "Выполняйте простые задания на фриланс-биржах.", profit: "5-50к₽", time: "2-6ч" },
                { title: "Аренда имущества", description: "Сдавайте в аренду технику, инструменты, одежду.", profit: "10-80к₽", time: "1ч" },
                { title: "Курьерская доставка", description: "Работайте курьером в свободное время.", profit: "2-30к₽", time: "4-8ч" },
                { title: "Продажа фото на стоках", description: "Продавайте свои работы на фотостоках.", profit: "5-40к₽", time: "2-3ч" },
                { title: "Выгул собак", description: "Выгуливайте собак в своем районе.", profit: "10-30к₽", time: "2-4ч" },
            ]
        },
    },
    reviews: [
        { name: "Алексей", avatar: "👨‍💻", rating: "⭐⭐⭐⭐⭐", text: "Отличное приложение! Нашел несколько рабочих схем.", date: "15.03.2024" },
        { name: "Мария", avatar: "👩‍🎨", rating: "⭐⭐⭐⭐⭐", text: "Очень удобный интерфейс и полезная информация.", date: "12.03.2024" },
        { name: "Дмитрий", avatar: "👨‍🚀", rating: "⭐⭐⭐⭐", text: "Хорошее приложение для старта, результат есть.", date: "10.03.2024" },
        { name: "Анна", avatar: "👩‍💼", rating: "⭐⭐⭐⭐⭐", text: "Супер! За месяц вышла на стабильный доход.", date: "08.03.2024" }
    ],
    bonusIdeas: [
        { title: "БОНУС: Создание Telegram-бота", description: "Разработайте и монетизируйте собственного Telegram-бота.", profit: "20-100к₽", time: "5-7ч" }
    ]
};

// --- USER MANAGER ---
class UserManager {
    constructor(botName) {
        this.botName = botName;
        this.users = this.getUsers();
    }

    getUsers() {
        try {
            return JSON.parse(localStorage.getItem('users_db')) || {};
        } catch (e) {
            return {};
        }
    }

    saveUsers() {
        localStorage.setItem('users_db', JSON.stringify(this.users));
    }

    getOrCreateUser(tgUser) {
        const defaultUser = {
            id: tgUser.id,
            username: tgUser.username || `${tgUser.first_name} ${tgUser.last_name || ''}`,
            referrals: 0,
            referred_by: null,
            rewards: {
                bonus_ideas: 0,
                premium_until: null,
                pro_status: false
            },
            is_new: true
        };
        
        if (!this.users[tgUser.id]) {
            this.users[tgUser.id] = defaultUser;
        } else {
            this.users[tgUser.id].is_new = false;
        }
        return this.users[tgUser.id];
    }

    processReferral(currentUser, startParam) {
        if (!startParam || !currentUser.is_new) return;

        const refId = startParam.replace('ref_', '');
        if (refId && this.users[refId] && refId != currentUser.id) {
            // Засчитываем реферала
            const referrer = this.users[refId];
            referrer.referrals += 1;
            currentUser.referred_by = refId;
            
            // Сбрасываем флаг нового пользователя
            currentUser.is_new = false;

            // Применяем награды для пригласившего
            this.applyRewards(referrer);
            
            // Сохраняем изменения
            this.saveUsers();
            
            if (window.Telegram && Telegram.WebApp) {
                Telegram.WebApp.showAlert(`Вы были приглашены пользователем ${referrer.username}!`);
            }
        }
    }

    applyRewards(user) {
        const refCount = user.referrals;
        
        // Награда за 1 реферала
        if (refCount >= 1 && user.rewards.bonus_ideas < 1) {
            user.rewards.bonus_ideas = 1;
        }
        // Награда за 3 реферала (7 дней премиума)
        if (refCount >= 3) {
            const now = new Date();
            const currentPremiumEnd = user.rewards.premium_until ? new Date(user.rewards.premium_until) : now;
            
            // Если премиум уже активен, продлеваем на 7 дней. Если нет - даем 7 дней с текущего момента.
            const newEndDate = (currentPremiumEnd > now ? currentPremiumEnd : now).setDate(currentPremiumEnd.getDate() + 7);
            
            if (!user.rewards.premium_until || newEndDate > user.rewards.premium_until) {
                 user.rewards.premium_until = newEndDate;
            }
        }
        // Награда за 10 рефералов
        if (refCount >= 10 && !user.rewards.pro_status) {
            user.rewards.pro_status = true;
        }
    }

    hasPremium(user) {
        return user.rewards.premium_until && user.rewards.premium_until > Date.now();
    }
}

// --- NAVIGATION & APP LOGIC ---
class Navigation {
    constructor() {
        this.history = ['home'];
        this.currentScreen = 'home';
        this.currentCategory = null;
        this.currentIdeaIndex = 0;
        this.currentReviewIndex = 0;
        this.tg = window.Telegram?.WebApp;

        // Инициализация менеджера пользователей
        this.userManager = new UserManager('your_bot_name'); // TODO: Замените на имя вашего бота
        const tgUser = this.tg?.initDataUnsafe?.user || { id: '12345', first_name: 'Test', username: 'testuser' };
        this.currentUser = this.userManager.getOrCreateUser(tgUser);
        
        // Обработка реферальной ссылки
        this.userManager.processReferral(this.currentUser, this.tg?.initDataUnsafe?.start_param);
        this.userManager.saveUsers();

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateNavigation();
        this.loadDailyIdea();
        this.loadReview();
        this.updateProfileStats();

        if (this.tg) {
            this.tg.ready();
            this.tg.expand();
        }
    }

    setupEventListeners() {
        document.getElementById('backBtn').addEventListener('click', () => this.goBack());
        document.getElementById('homeBtn').addEventListener('click', () => this.goHome());

        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', (e) => this.navigateTo(e.currentTarget.dataset.screen));
        });

        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => this.openCategory(e.currentTarget.dataset.category));
        });

        document.getElementById('nextIdeaBtn').addEventListener('click', () => this.nextIdea());
        document.getElementById('randomIdeaBtn').addEventListener('click', () => this.randomIdea());
        document.getElementById('nextReviewBtn').addEventListener('click', () => this.nextReview());
        document.getElementById('closeAppBtn').addEventListener('click', () => this.tg?.close());

        // Реферальные кнопки
        document.getElementById('refCopyBtn').addEventListener('click', () => this.copyRefLink());
        document.getElementById('refInviteBtn').addEventListener('click', () => this.inviteFriends());
    }

    navigateTo(screen) {
        if (!screen) return;
        this.showScreen(screen + 'Screen');
        this.history.push(screen);
        this.currentScreen = screen;
        this.updateNavigation();

        if (screen === 'referrals') {
            this.renderReferralsScreen();
        }
        if (screen === 'premium') {
            this.renderPremiumScreen();
        }
        if (screen === 'profile') {
            this.updateProfileStats();
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const newScreen = document.getElementById(screenId);
        if (newScreen) {
            newScreen.classList.add('active');
        }
    }

    updateNavigation() {
        const backBtn = document.getElementById('backBtn');
        const homeBtn = document.getElementById('homeBtn');
        const navTitle = document.getElementById('navTitle');

        const isNotHome = this.history.length > 1;
        backBtn.style.display = isNotHome ? 'block' : 'none';
        homeBtn.style.display = isNotHome ? 'block' : 'none';

        const titles = {
            home: 'Монетизация Идей',
            categories: 'Категории',
            categoryView: this.currentCategory ? appData.categories[this.currentCategory].name : 'Категория',
            daily: 'Схема дня',
            premium: 'Премиум',
            profile: 'Профиль',
            reviews: 'Отзывы',
            referrals: 'Пригласи друга'
        };
        navTitle.textContent = titles[this.currentScreen] || 'Монетизация Идей';
    }

    goBack() {
        if (this.history.length > 1) {
            this.history.pop();
            const prevScreen = this.history[this.history.length - 1];
            this.navigateTo(prevScreen);
        }
    }

    goHome() {
        this.history = [];
        this.navigateTo('home');
    }
    
    updateProfileStats() {
        const user = this.currentUser;
        if (!user) return;

        document.getElementById('userName').textContent = user.username;
        document.getElementById('userUsername').textContent = `@${user.username}`;
        
        const viewedIdeas = parseInt(localStorage.getItem('viewedIdeas') || '0');
        document.getElementById('viewedIdeas').textContent = viewedIdeas;
        
        // Добавляем отображение статуса PRO
        const proStatusEl = document.querySelector('.profile-name');
        if (user.rewards.pro_status && !proStatusEl.textContent.includes('PRO')) {
            proStatusEl.textContent += ' (PRO)';
        }
    }

    // --- Логика реферальной системы ---
    renderReferralsScreen() {
        const user = this.currentUser;
        const botName = this.userManager.botName;
        
        document.getElementById('refUserId').textContent = user.id;
        document.getElementById('refCount').textContent = user.referrals;
        
        const refLink = `https://t.me/${botName}?start=ref_${user.id}`;
        document.getElementById('refLinkInput').value = refLink;

        // Обновление прогресс-баров
        this.updateProgressBar(user.referrals, 1, 'progress-1');
        this.updateProgressBar(user.referrals, 3, 'progress-3');
        this.updateProgressBar(user.referrals, 10, 'progress-10');
    }
    
    updateProgressBar(current, target, elementId) {
        const progress = Math.min((current / target) * 100, 100);
        document.getElementById(elementId).style.width = `${progress}%`;
        document.getElementById(`${elementId}-text`).textContent = `${Math.min(current, target)} / ${target}`;
        
        const card = document.getElementById(`rewardCard-${target}`);
        if (current >= target) {
            card.classList.add('completed');
            card.classList.remove('active');
        } else if (current >= (target > 1 ? (target === 3 ? 1 : 3) : 0)) {
            card.classList.add('active');
            card.classList.remove('completed');
        }
    }

    copyRefLink() {
        const refLinkInput = document.getElementById('refLinkInput');
        refLinkInput.select();
        document.execCommand('copy');
        this.tg?.showAlert('Ссылка скопирована!');
    }

    inviteFriends() {
        const refLink = document.getElementById('refLinkInput').value;
        const text = `Привет! Зацени крутое приложение с идеями по заработку. Регистрируйся по моей ссылке и получай бонусы: ${refLink}`;
        this.tg?.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(text)}`);
    }

    renderPremiumScreen() {
        const buyView = document.getElementById('premium-buy-view');
        const activeView = document.getElementById('premium-active-view');
        
        if (this.userManager.hasPremium(this.currentUser)) {
            buyView.style.display = 'none';
            activeView.style.display = 'block';
            
            const endDate = new Date(this.currentUser.rewards.premium_until).toLocaleDateString('ru-RU');
            document.getElementById('premium-end-date').textContent = endDate;
        } else {
            buyView.style.display = 'block';
            activeView.style.display = 'none';
        }
    }

    // --- Остальная логика без изменений ---
    openCategory(category) {
        this.currentCategory = category;
        this.currentIdeaIndex = 0;
        this.navigateTo('categoryView');
        setTimeout(() => this.loadIdea(), 100);
    }

    loadIdea() {
        if (!this.currentCategory) return;
        const category = appData.categories[this.currentCategory];
        const idea = category.ideas[this.currentIdeaIndex];
        
        document.getElementById('categoryTitle').textContent = category.name;
        document.getElementById('ideaNumber').textContent = `Идея #${this.currentIdeaIndex + 1}`;
        document.getElementById('ideaTitle').textContent = idea.title;
        document.getElementById('ideaDescription').textContent = idea.description;
        document.getElementById('ideaProfit').textContent = idea.profit;
        document.getElementById('ideaTime').textContent = idea.time;

        const viewedIdeas = parseInt(localStorage.getItem('viewedIdeas') || '0') + 1;
        localStorage.setItem('viewedIdeas', viewedIdeas);
        this.updateProfileStats();
    }

    nextIdea() {
        if (!this.currentCategory) return;
        const category = appData.categories[this.currentCategory];
        this.currentIdeaIndex = (this.currentIdeaIndex + 1) % category.ideas.length;
        this.loadIdea();
    }

    randomIdea() {
        if (!this.currentCategory) return;
        const category = appData.categories[this.currentCategory];
        this.currentIdeaIndex = Math.floor(Math.random() * category.ideas.length);
        this.loadIdea();
    }

    loadDailyIdea() {
        const today = new Date().toDateString();
        let dailyIdea = JSON.parse(localStorage.getItem('dailyIdea'));
        if (localStorage.getItem('dailyIdeaDate') !== today) {
            const allIdeas = Object.values(appData.categories).flatMap(c => c.ideas);
            dailyIdea = allIdeas[Math.floor(Math.random() * allIdeas.length)];
            localStorage.setItem('dailyIdea', JSON.stringify(dailyIdea));
            localStorage.setItem('dailyIdeaDate', today);
        }
        if (dailyIdea) {
            document.getElementById('dailyTitle').textContent = dailyIdea.title;
            document.getElementById('dailyDescription').textContent = dailyIdea.description;
            document.getElementById('dailyProfit').textContent = dailyIdea.profit;
            document.getElementById('dailyTime').textContent = dailyIdea.time;
        }
    }

    loadReview() {
        const review = appData.reviews[this.currentReviewIndex];
        document.getElementById('reviewAvatar').textContent = review.avatar;
        document.getElementById('reviewName').textContent = review.name;
        document.getElementById('reviewRating').textContent = review.rating;
        document.getElementById('reviewText').textContent = review.text;
        document.getElementById('reviewDate').textContent = review.date;
    }

    nextReview() {
        this.currentReviewIndex = (this.currentReviewIndex + 1) % appData.reviews.length;
        this.loadReview();
    }
}

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// src/i18n.ts
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    locale: navigator.language.includes('ru') ? 'ru' : 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        en: {
            title: "Tool ROI Calculator",
            description: "Calculate the return on investment for tools in Farm World",
            woodPrice: "Price per unit of Wood",
            foodPrice: "Price per unit of Food",
            stonePrice: "Price per unit of Stone",
            fetchPrices: "Auto-update prices",
            manualPrices: "Set prices manually",
            addTool: "Add Tool",
            addedTools: "My Tools",
            noAddedTools: "No tools",
            dailyProfit: "Daily",
            dailyProfitFull: "Daily total",
            craftCost: "Craft Cost",
            days: "days",
            remove: "Remove",
            chooseToolType: "Choose tool type",
            craftPriceFull: "Craft Price",
            craftPriceShort: "Investments",
            cancel: "Cancel",
            add: "Add",
            appreciationText: 'Say thanks❤️ to the author:',
            copiedMessage: 'Address copied to clipboard',
            settings: 'Settings',
            myTools: "My Tools",
            noToolsAdded: "No tools added yet.",
            noAccounts: "No accounts added yet.",
            addToolsInSettings: "Add your tools in the settings.",
            production: "Income",
            consumption: "Costs",
            income: "Profit",
            invested: "Invested",
            roi: "ROI",
            serverError: "The prices from server is unavailable. Manually enter the current prices in the settings.",
            accounts: "My accounts",
            addAccount: "Add Account",
            myAccount: "My Account",
            fullDailyProfit: "Full daily",
            showCharts: "Show Charts",
            priceCharts: "Price Charts",
            prevDay: "Previous Day",
            nextDay: "Next Day",
            chartError: "Failed to load chart data.",
            stackPriceCalculator: "Stack Price Calculator",
            resourceAmount: "Resource Amount",
            resourceType: "Resource Type",
            pricePerUnit: "Price per Unit",
            autoPrice: "Auto Price",
            stackPrice: "Stack Price",
            wood: "Wood",
            food: "Food",
            stone: "Stone",
            skin: "Skin",
            upgradeCost: "Upgrade Cost",
            buildSlotCost: "Build Slot Cost",
            level: "Level",
            sawmill: "Sawmill",
            kitchen: "Kitchen",
            forge: "Forge",
            siteNews: "New functionality",
            seasonSpring: "spring",
            seasonSummer: "summer",
            seasonAutumn: "autumn",
            seasonWinter: "winter",
            nftPrice: "NFT Price",
            nft: "NFT",
            craft: "craft",

            boostPercentage: "Production",
            workers: "Workers",
            tents: "Tents",

            addTent: "Add Tent",
            noTentsAdded: "No tents added yet.",
            noToolsOrTentsAdded: "No tools or tents added yet.",
            addToolsOrTentsInSettings: "Add your tools or tents in the settings.",
            chooseTentType: "Choose tent type",
            boost: "Boost",
            additionalSlots: "Slots",
            totalBoost: "Total Boost",
            totalAdditionalSlots: "Total Slots",
            commonTent: "Common Tent",
            uncommonTent: "Uncommon Tent",
            rareTent: "Rare Tent",
            tools: "Tools",

            enhancements: "Enhancements",
            enhancement: "Enhancement",
            addEnhancement: "Add Enhancement",
            chooseEnhancementType: "Choose enhancement type",
            dogBoost: "Hunting chance boost: +{boost}%",
            clothingEffect: "Removes winter energy debuff",
            clothingEquipped: "Clothing equipped",
            addClothing: "Add Clothing",
            huntingChance: "Hunting Chance",
            dog: "Dog",
            clothing: "Clothing",
        },
        ru: {
            title: "Калькулятор окупаемости",
            description: "Рассчитайте окупаемость инструментов в Farm World",
            woodPrice: "Цена за единицу дерева",
            foodPrice: "Цена за единицу еды",
            stonePrice: "Цена за единицу камня",
            fetchPrices: "Авто-обновление цен",
            manualPrices: "Ввести цены вручную",
            addTool: "Добавить инструмент",
            addedTools: "Мои инструменты",
            noAddedTools: "Нет иструментов",
            dailyProfit: "В день",
            dailyProfitFull: "В день всего",
            craftCost: "Цена крафта",
            days: "дней",
            remove: "Удалить",
            chooseToolType: "Выберите тип инструмента",
            craftPriceFull: "Цена покупки/крафта",
            craftPriceShort: "Вложения",
            cancel: "Отмена",
            add: "Добавить",
            appreciationText: 'Сказать спасибо❤️ автору:',
            copiedMessage: 'Адрес скопирован в буфер обмена',
            settings: 'Настройки',
            myTools: "Мои инструменты",
            noToolsAdded: "Пока не добавлено ни одного инструмента.",
            noAccounts: "Пока не добавлено ни аккаунта.",
            addToolsInSettings: "Добавьте свои инструменты в настройках.",
            production: "Добыча",
            consumption: "Расход",
            income: "Доход",
            invested: "Вложено",
            roi: "ROI",
            serverError: "Сервер цен недоступен. Вручную введите актуальные цены в настройках.",
            accounts: "Мои аккаунты",
            addAccount: "Добавить аккаунт",
            myAccount: "Мой аккаунт",
            fullDailyProfit: "Всего в день",
            showCharts: "Показать графики",
            priceCharts: "Графики цен",
            prevDay: "Предыдущий день",
            nextDay: "Следующий день",
            chartError: "Не удалось загрузить данные графика.",
            stackPriceCalculator: "Калькулятор цен на стаки",
            resourceAmount: "Количество ресурсов",
            resourceType: "Тип ресурса",
            pricePerUnit: "Цена за штуку",
            autoPrice: "Автоматическая цена",
            stackPrice: "Цена стака",
            wood: "Дерево",
            food: "Еда",
            stone: "Камень",
            skin: "Шкуры",
            upgradeCost: "Цена Улучшения",
            buildSlotCost: "Цена постройки слота",
            level: "Уровень",
            sawmill: "Лесопилка",
            kitchen: "Кухня",
            forge: "Кузница",
            siteNews: "Новый функционал",
            seasonSpring: "весна",
            seasonSummer: "лето",
            seasonAutumn: "осень",
            seasonWinter: "зима",
            nftPrice: "Цена нфт",
            nft: "NFT",
            craft: "крафт",

            boostPercentage: "Добыча",
            workers: "Рабочие",
            tents: "Палатки",

            addTent: "Добавить палатку",
            noTentsAdded: "Палатки еще не добавлены.",
            noToolsOrTentsAdded: "Инструменты или палатки еще не добавлены.",
            addToolsOrTentsInSettings: "Добавьте ваши инструменты или палатки в настройках.",
            chooseTentType: "Выберите тип палатки",
            boost: "Усиление",
            additionalSlots: "Cлоты",
            totalBoost: "Общее усиление",
            totalAdditionalSlots: "Всего слотов",
            commonTent: "Обычная палатка",
            uncommonTent: "Необычная палатка",
            rareTent: "Редкая палатка",
            tools: "Инструменты",

            enhancements: "Усиления",
            enhancement: "Усиление",
            addEnhancement: "Добавить усиление",
            chooseEnhancementType: "Выберите тип усиления",
            dogBoost: "Бонус собаки: +{boost}% к шансу охоты луком",
            clothingEffect: "Отменяет зимний штраф к энергии",
            withDog: "с Собакой",
            roiWithDog: "ROI с Собакой",
            dogCraftChance: "Шанс успешного крафта: {chance}%",
            huntingChance: "Шанс Охоты",
            dog: "Собака",
            clothing: "Одежда",
        },
    },
});

export default i18n;
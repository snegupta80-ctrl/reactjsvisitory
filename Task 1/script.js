// Closure to manage application state (exchange rates)
function createCurrencyConverter() {
    let exchangeRates = {}; // Private variable inside closure

    // Function to fetch exchange rates using Fetch API and Promises
    function fetchExchangeRates() {
        return fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                exchangeRates = data.rates; // Store rates in closure
                return exchangeRates;
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                throw error;
            });
    }

    // Function to convert currency
    function convertCurrency(amount, fromCurrency, toCurrency) {
        if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
            throw new Error('Invalid currency');
        }
        const amountInUSD = amount / exchangeRates[fromCurrency];
        return amountInUSD * exchangeRates[toCurrency];
    }

    // Public methods exposed by closure
    return {
        fetchRates: fetchExchangeRates,
        convert: convertCurrency,
        getRates: () => exchangeRates
    };
}

// Initialize the converter
const converter = createCurrencyConverter();

// DOM elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');

// Event listener for convert button
convertBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please enter a valid amount';
        return;
    }

    loadingDiv.style.display = 'block';
    resultDiv.textContent = '';

    // Fetch rates if not already fetched, then convert
    converter.fetchRates()
        .then(() => {
            const convertedAmount = converter.convert(amount, fromCurrency, toCurrency);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            resultDiv.textContent = 'Error: Unable to fetch exchange rates. Please try again.';
        })
        .finally(() => {
            loadingDiv.style.display = 'none';
        });
});

// Auto-convert on input change (bonus feature)
amountInput.addEventListener('input', () => {
    if (amountInput.value) {
        convertBtn.click();
    }
});

fromCurrencySelect.addEventListener('change', () => {
    if (amountInput.value) {
        convertBtn.click();
    }
});

toCurrencySelect.addEventListener('change', () => {
    if (amountInput.value) {
        convertBtn.click();
    }
});
async function cargarCotizaciones() {
    try {
        
        document.getElementById('loading').style.display = 'block';

        const respuestaDolar = fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json());
        const respuestaBitcoin = fetch('https://api.coindesk.com/v1/bpi/currentprice.json').then(res => res.json());
        const respuestaCop = fetch('https://open.er-api.com/v6/latest/COP').then(res => res.json());

        const [dolarData, bitcoinData, copData] = await Promise.all([respuestaDolar, respuestaBitcoin, respuestaCop]);

        document.getElementById('cotizacion-dolar').innerText = `USD-COP: ${dolarData.rates.COP}`;
        document.getElementById('cotizacion-bitcoin').innerText = `Bitcoin-USD: ${bitcoinData.bpi.USD.rate}`;
        document.getElementById('cotizacion-cop').innerText = `COP-DOLAR: ${copData.rates.USD}`;

    } catch (error) {
        console.error("Error al cargar las cotizaciones: ", error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

window.onload = cargarCotizaciones;

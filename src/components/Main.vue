<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="quantity">
        <span>Введите кол-во</span>
        <input type="text" placeholder="Кол-во" v-model="quantity">
      </div>
      <div class="direction">
        <div class="from">
          <span>Откуда</span>
          <select v-model="fromCurrency">
            <option value="rub">Рубли</option>
            <option value="eur">Евро</option>
            <option value="usd">Доллары(США)</option>
          </select>
        </div>
        <div class="to">
          <span>Куда</span>
          <select v-model="toCurrency">
            <option value="rub">Рубли</option>
            <option value="eur">Евро</option>
            <option value="usd">Доллары(США)</option>
          </select>
        </div>
      </div>
      <div class="result">
        <input type="submit" value="Рассчитать">
        <span>{{ result }}</span>
      </div>
    </form>
  </div>
</template>

<script>


export default {
  name: 'Form',
  data: function() {
    return {
      fromCurrency: 'rub',
      toCurrency: 'usd',
      quantity: 0,
      exchangeRates: {
        'rub': 1,
        'usd': 73.42,
        'eur': 80.2
      },
      result: "",
    };
  },
  created: async function() {
    const url = 'http://localhost:3000';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      for (let key in data) {
        const val = +data[key];
        key = key.replace('RUB', '').toLowerCase();
        this.exchangeRates[key] = val;
      }
    } else {
      alert('Ошибка при получении актуальных курсов валют!');
    }
    console.log('this.exchangeRates = ', this.exchangeRates);
  },
  methods: {
    handleSubmit: function() {
      const from = this.fromCurrency;
      const to = this.toCurrency;
      const quantity = this.quantity;
      this.result = this.exchangeRates[from] * quantity / this.exchangeRates[to];
    }
  }
}
</script>

<style scoped>
  form {
    margin: 0 auto;
    background-color: #c9a0dc;
    width: 500px;
    padding: 25px;
    border-radius: 10px;
  }

  .quantity {
    margin: 10px 0;
  }
  .quantity > * {
    display: inline-block;
    margin: 0 20px;
  }

  .direction {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 25px 0;
  }
  .direction > div > * {
    display: inline-block;
    margin: 0 6px;
  }

  .result {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 25px 0;
  }

  .result > span {
    display: inline-block;
    width: 200px;
    background-color: #faa;
    padding: 10px;
  }

  .result input[type="submit"] {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
</style>

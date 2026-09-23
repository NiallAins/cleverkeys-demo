<template>
  <main class="view-shop">
    <section
      v-if="state === 'success'"
      class="message success"
      v-html="text.success"
    ></section>
    <section
      v-if="state === 'cancel'"
      class="message cancel"
      v-html="text.cancel"
    ></section>

    <h1>{{ text.title }}</h1>
    <p v-html="text.intro"></p>

    <div v-if="productData.length === 0" class="loading">
      <h2>{{ text.loading }}</h2>
    </div>

    <div v-if="productData.length > 0">
      <div class="product" v-for="prod in productData">
        <div class="image">
          <img v-if="prod.images.length" :src="prod.images[0]" :alt="'image of ' + prod.name" />
        </div>
        <div class="text">
          <h2>{{ prod.name }}</h2>
          <p>
            {{ prod.description }}
          </p>
        </div>
        <div class="controls">
          <h3>€{{ prod.price }}</h3>
          <button class="secondary c-shop" @click="setQuantity(prod, -1)"> - </button>
          <span> {{ prod.quantity }} </span>
          <button class="secondary c-shop" @click="setQuantity(prod, 1)"> + </button>
        </div>
      </div>

      <div class="totals">
        <span>{{ text.total }} €{{ totalPrice }}</span>
        <button
          @click="checkout()"
          :disabled="totalPrice === 0 || requestSent"
          class="primary c-shop"
        >
          {{ text.btnCheckout }}
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  @import '../vars.scss';

  .view-shop {
    h2, h3 {
      @include f-larger;
      margin-top: $p-sm;
    }

    .message {
      border: 2px solid;
      border-radius: 8px;
      padding: $p-md $p-lg;
      margin-bottom: $p-xl;
      margin-left: -$p-sm;
      margin-right: -$p-sm;

      &.success {
        border-color: $c-active-4;
      }

      &.cancel {
        border-color: $c-active-2-d;
      }
    }

    .loading {
      text-align: center;
      padding: $p-xl 0;
    }

    .product {
      display: flex;
      padding: $p-md $p-xxl;
      border-bottom: 1px solid $c-border;
      margin: 0 auto;

      .image {
        height: 200px;
        width: 200px;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      .text {
        width: 100%;
        padding: 0 $p-lg;
      }

      .controls {
        width: 300px;
        padding: 0 $p-xl;
        text-align: center;
        font-size: $f-size-title;
        white-space: nowrap;

        button {
          @include f-title;
          padding: $p-sm #{$p-sm * 1.5};
        }

        span {
          display: inline-block;
          width: 2.5em;
          text-align: center;
        }
      }
    }

    .totals {
      float: right;
      width: 300px;
      padding: $p-md $p-xl;
      font-size: $f-size-lg;
      text-align: center;

      span {
        display: block;
        margin-top: $p-sm;
      }

      button {
        margin-top: $p-lg;
      }
    }

    @media (max-width: $w-mob) {
      .product {
        flex-wrap: wrap;
        padding: $p-lg 0;

        .image, .text, .controls {
          width: 100%;
        }

        .image {
          text-align: center;
          padding-bottom: $p-md;
        }
      }

      .totals {
        width: 100%;
        padding: $p-md 0;

        button {
          width: 100%;
        }
      }
    }
  }
</style>

<script>
  import testProducts from '../../dev_assets/products.json';

  export default {
    name: 'ViewShop',
    props: [
      'state'
    ],
    data: function() {
      return {
        stripeRef: 'demo',
        productData: [],
        totalPrice: 0,
        requestSent: false,
        hasError: false
      }
    },
    created: function() {
      this.text = this.$siteContent.textContent.shop;

      const comp = this;
      if (PROD) {
        fetch('get-products.php', {
          method: 'POST'
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            comp.setProductData(response);
          })
          .catch(function (error) {
            console.error('Error:', error);
            comp.hasError = true;
          });
      } else {
        setTimeout(() => {
          this.setProductData(testProducts);
        }, 2000);
      }
    },
    methods: {
      setProductData: function(response) {
        this.productData = response.products.data;
        this.productData.forEach(prod => {
          const price = response.prices.data.find(price => price.product === prod.id);
          prod.price = (price.unit_amount / 100).toFixed(2);
          prod.priceId = price.id;
          prod.quantity = 0;
        });
      },
      setQuantity: function(prod, amount) {
        prod.quantity += amount;
        prod.quantity = Math.max(0, prod.quantity);
        this.totalPrice = this.productData.reduce((total, prod) => total + (prod.price * prod.quantity), 0);
      },
      checkout: function() {
        const cart = this.productData.filter(prod => prod.quantity > 0);
        if (cart.length === 0 || this.requestSent) {
          return;
        }

        const comp = this;
        const query =
          '?id=' + cart.map(prod => prod.priceId).join('+') +
          '&quantity=' + cart.map(prod => prod.quantity).join('+');

        if (PROD) {
          fetch('create-session.php' + query, { method: 'POST' })
            .then(function (response) {
              return response.json();
            })
            .then(function (session) {
              comp.requestSent = true;
              return comp.stripeRef.redirectToCheckout({ sessionId: session.id });
            })
            .then(function (result) {
              if (result.error) {
                comp.hasError = true;
              }
            })
            .catch(function (error) {
              console.error('Error:', error);
              comp.hasError = true;
            });
        } else {
          this.requestSent = true;
          this.hasError = true;
        }
      }
    }
  }
</script>
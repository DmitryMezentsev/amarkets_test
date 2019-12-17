<template>
  <div class="wizard-form">
    <div class="form-wrap">
      <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver_1">
        <b-form @submit.prevent="handleSubmit(next)" v-show="step === 1" novalidate>
          <b-form-group label="Спектакль *" label-for="performance-select">
            <ValidationProvider rules="selectRequired" vid="performance">
              <div slot-scope="{ errors }">
                <b-form-select
                  id="performance-select"
                  v-model="innerData.performance"
                  :options="performanceSelectOptions"
                  required
                  @change="innerData.session = null"
                >
                  <template v-slot:first v-if="!innerData.performance">
                    <option :value="null" disabled>[Не выбран]</option>
                  </template>
                </b-form-select>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="Время *" label-for="session-select">
            <ValidationProvider rules="selectRequired" vid="session">
              <div slot-scope="{ errors }">
                <b-form-select
                  id="session-select"
                  v-model="innerData.session"
                  :options="sessionSelectOptions"
                  :disabled="!innerData.performance"
                  required
                >
                  <template v-slot:first v-if="!innerData.session">
                    <option :value="null" disabled>[Не выбрано]</option>
                  </template>
                </b-form-select>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-button type="submit" class="hidden" />
        </b-form>
      </ValidationObserver>
      <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver_2">
        <b-form @submit.prevent="handleSubmit(next)" v-show="step === 2" novalidate>
          <b-form-group label="Имя *" label-for="first-name">
            <ValidationProvider rules="required" vid="first_name">
              <div slot-scope="{ errors }">
                <b-form-input
                  id="first-name"
                  v-model="innerData.first_name"
                  ref="firstName"
                  maxlength="32"
                  required
                ></b-form-input>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="Фамилия *" label-for="last-name">
            <ValidationProvider rules="required" vid="last_name">
              <div slot-scope="{ errors }">
                <b-form-input
                  id="last-name"
                  v-model="innerData.last_name"
                  maxlength="32"
                  required
                ></b-form-input>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="Дата рождения *" label-for="birthday">
            <ValidationProvider rules="required" vid="birthday">
              <div slot-scope="{ errors }">
                <date-picker
                  value=""
                  v-model="innerData.birthday"
                  id="birthday"
                  :config="{ format: 'YYYY.MM.DD', locale: 'ru' }"
                ></date-picker>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="E-mail *" label-for="email">
            <ValidationProvider rules="required|email" vid="email">
              <div slot-scope="{ errors }">
                <b-form-input
                  id="email"
                  v-model="innerData.email"
                  type="email"
                  required
                ></b-form-input>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="Тип оплаты *" label-for="payment-type">
            <ValidationProvider rules="selectRequired" vid="payment.type">
              <div slot-scope="{ errors }">
                <b-form-select id="payment-type" v-model="innerData.payment.type" required>
                  <option value="card">Картой</option>
                  <option value="cash">Наличными</option>
                </b-form-select>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <ValidationProvider rules="accept" vid="accept">
            <div slot-scope="{ errors }">
              <b-form-checkbox v-model="innerData.accept" :value="true" :unchecked-value="false">
                Согласен с условиями
              </b-form-checkbox>
              <ValidationError :errors="errors" />
            </div>
          </ValidationProvider>

          <b-button type="submit" class="hidden" />
        </b-form>
      </ValidationObserver>
      <ValidationObserver v-slot="{ handleSubmit }" ref="validationObserver_3">
        <b-form @submit.prevent="handleSubmit(next)" v-show="step === 3" novalidate>
          <b-form-group label="Номер карты *" label-for="payment-card-number">
            <ValidationProvider rules="required|length:19" vid="payment.card.number">
              <div slot-scope="{ errors }">
                <b-form-input
                  ref="paymentCardNumber"
                  id="payment-card-number"
                  v-mask="'####-####-####-####'"
                  v-model="innerData.payment.card.number"
                  required
                ></b-form-input>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="Срок действия *" label-for="payment-card-valid-thru">
            <ValidationProvider rules="required|length:5" vid="payment.card.valid_thru">
              <div slot-scope="{ errors }">
                <b-form-input
                  ref="paymentCardValidThru"
                  id="payment-card-valid-thru"
                  v-mask="'##/##'"
                  v-model="innerData.payment.card.valid_thru"
                  required
                ></b-form-input>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group label="Имя держателя карты *" label-for="payment-card-name">
            <ValidationProvider rules="required" vid="payment.card.name">
              <div slot-scope="{ errors }">
                <b-form-input
                  ref="paymentCardName"
                  id="payment-card-name"
                  v-model="innerData.payment.card.name"
                  required
                ></b-form-input>
                <ValidationError :errors="errors" />
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-button type="submit" class="hidden" />
        </b-form>
      </ValidationObserver>
    </div>
    <div class="buttons">
      <b-row>
        <b-col cols="auto" class="mr-auto">
          <b-button size="lg" v-show="step > 1 && !pending" @click="prevStep">Назад</b-button>
        </b-col>
        <b-col cols="auto">
          <b-button size="lg" :disabled="pending" @click="next">{{
            pending ? 'Обработка...' : 'Далее'
          }}</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import eventBus from 'Common/js/bus';
import prepareServerErrors from 'Common/js/prepare-server-errors';
import ValidationError from 'Components/ValidationError';

export default {
  name: 'WizardForm',
  components: { ValidationError },
  data() {
    return {
      innerData: {},
    };
  },
  computed: {
    ...mapState(['step', 'performances', 'sessions', 'data', 'pending']),
    performanceSelectOptions() {
      return this.performances
        ? this.performances.map(({ id, attributes }) => {
            return {
              text: `${attributes.title} (${attributes.genres.join(', ').toLowerCase()})`,
              value: id,
            };
          })
        : [];
    },
    sessionSelectOptions() {
      function timeFormat(from, to) {
        const fromSplitted = from.split(' ');
        const toSplitted = to.split(' ');

        return `${fromSplitted[0]}, ${fromSplitted[1]}-${toSplitted[1]}`;
      }

      return this.sessions
        ? this.sessions
            .filter(
              // Оставляем только те сеансы, которые соответствуют выбранному спектаклю
              ({ relationships: { performance } }) =>
                performance.data.id === this.innerData.performance,
            )
            .map(({ id, attributes }) => {
              return {
                text: timeFormat(attributes.from, attributes.to),
                value: id,
              };
            })
        : [];
    },
    maxStep() {
      return this.data.payment.type === 'card' ? 3 : 2;
    },
  },
  methods: {
    ...mapMutations(['setData', 'prevStep', 'nextStep']),
    next() {
      const observer = this.$refs[`validationObserver_${this.step}`];
      observer.validate();

      setTimeout(() => {
        if (observer.flags.valid) {
          if (this.step < this.maxStep) {
            this.nextStep();
          } else {
            this.$emit('submit');
          }
        }
      }, 50);
    },
  },
  created() {
    this.innerData = { ...this.data };

    eventBus.$on('setVeeErrors', errors => {
      for (let i = 1; i <= 3; ++i)
        this.$refs[`validationObserver_${i}`].setErrors(prepareServerErrors(errors));
    });
  },
  watch: {
    innerData: {
      handler(innerData) {
        this.setData(innerData);
      },
      deep: true,
    },
    step: {
      handler(step) {
        this.$nextTick(() => {
          if (step === 2) {
            this.$refs.firstName.focus();
          } else if (step === 3) {
            this.$refs.paymentCardNumber.focus();
          }
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import '~Common/colors';

.wizard-form {
  .form-wrap {
    border-top: 1px dotted @color-light;
    border-bottom: 1px dotted @color-light;
    padding: 1rem;
    border-radius: 0.3rem;
    background-color: @color-light;
    color: @color-dark;

    form {
      max-width: 560px;
    }
  }

  .buttons {
    margin-top: 1.25rem;
  }
}
</style>

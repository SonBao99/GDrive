<template>
    <div>
        <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

        <form action="#" @submit.prevent="onSubmit">
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="vietnam flag"></i> Vietnamese
                </div>
                <input type="text" readonly :disabled="testOver" :value="currWord.vietnamese" />
            </div>
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="united kingdom flag"></i> English
                </div>
                <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver"
                    autocomplete="off" />
            </div>
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="japan flag"></i> Japanese
                </div>
                <input type="text" placeholder="Enter word..." v-model="japanese" :disabled="testOver"
                    autocomplete="off" />
            </div>

            <button class="positive ui button" :disabled="testOver">Submit</button>
        </form>

        <p :class="['results', resultClass]">
            <span v-html="result"></span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'vocab-test',
    props: {
        words: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            randWords: [...this.words.sort(() => 0.5 - Math.random())],
            incorrectGuesses: [],
            result: '',
            resultClass: '',
            english: '',
            japanese: '',
            score: 0,
            testOver: false
        };
    },
    computed: {
        currWord: function () {
            return this.randWords.length ? this.randWords[0] : '';
        }
    },
    methods: {
        onSubmit: function () {
            let correctEnglish = this.english === this.currWord.english;
            let correctJapanese = this.japanese === this.currWord.japanese;

            // Check both answers for a full point
            if (correctEnglish && correctJapanese) {
                this.flash('Correct! Full point.', 'success', { timeout: 1000 });
                this.score += 1;  // Full point
            } else if (correctEnglish || correctJapanese) {
                this.flash('Partial Correct! Proceeding.', 'warning', { timeout: 1000 });
            } else {
                this.flash('Incorrect! Proceeding.', 'error', { timeout: 1000 });
                this.incorrectGuesses.push(this.currWord.vietnamese);
            }

            // Reset inputs and move to the next word
            this.english = '';
            this.japanese = '';
            this.randWords.shift();

            // End of the test condition
            if (this.randWords.length === 0) {
                this.testOver = true;
                this.displayResults();
            }
        },


        displayResults: function () {
            if (this.incorrectGuesses.length === 0) {
                this.result = 'You got everything correct. Well done!';
                this.resultClass = 'success';
            } else {
                const incorrect = this.incorrectGuesses.join(', ');
                this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
                this.resultClass = 'error';
            }
        }
    }
};
</script>

<style scoped>
.results {
    margin: 25px auto;
    padding: 15px;
    border-radius: 5px;
}

.error {
    border: 1px solid #ebccd1;
    color: #a94442;
    background-color: #f2dede;
}

.success {
    border: 1px solid #d6e9c6;
    color: #3c763d;
    background-color: #dff0d8;
}
</style>
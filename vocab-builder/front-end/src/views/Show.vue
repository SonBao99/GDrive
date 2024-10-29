<template>
    <div>
        <h1>Show Word</h1>

        <div class="ui labeled input fluid">
            <div class="ui label custom-label">
                <i class="vietnam flag"></i> Vietnamese
            </div>
            <input type="text" readonly :value="word.vietnamese" />
        </div>
        <div class="ui labeled input fluid">
            <div class="ui label custom-label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" readonly :value="word.english" />
        </div>
        <div class="actions">
            <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }">
                Edit word
            </router-link>
        </div>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
    name: 'show',
    data() {
        return {
            word: '' // Initialize word as an empty object
        };
    },
    async mounted() {
        try {
            this.word = await api.getWord(this.$route.params.id); // Use getWord to fetch a single word
        } catch (error) {
            console.error("Error fetching word:", error);
            // Optionally handle the error by setting an error message in data
        }
    }
};
</script>

<style scoped>
.custom-label {
    width: 140px;
    /* Adjust the width as needed */
    line-height: 40px;
    /* Center text vertically */
}

.ui.labeled.input .ui.label {
    white-space: nowrap;
    /* Prevents text from wrapping */
    overflow: hidden;
    /* Hides overflow text */
    text-overflow: ellipsis;
    /* Adds ellipsis if text is too long */
}

.ui.input {
    flex-grow: 1;
    /* Allow the input field to grow and take more space */
}

.actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
}
</style>

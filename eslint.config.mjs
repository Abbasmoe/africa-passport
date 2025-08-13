import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "no-console": "off", // allow console.log in TypeScript files
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off",
  },
});

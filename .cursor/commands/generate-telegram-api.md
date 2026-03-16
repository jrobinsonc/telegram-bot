# generate-telegram-api

When this command is run, do the following:

1. **Fetch Telegram Bot API docs**
   - Open the page `https://core.telegram.org/bots/api#available-methods`.
   - Read the following methods listed under the **"Available methods"** header:
     - sendMessage

2. **Derive TypeScript interfaces**
   - For each method, derive a TypeScript interface representation of:
     - The request parameters, e.g., for the method `sendMessage`, you will create `SendMessageParams` with all the parameters listed in the method and its documentation.
     - The successful result type that is mentioned for the method, e.g., for the method `getMessage`, it says the successful result type is `Message`.
   - Write the newly-derived interfaces into `src/utils/telegram/generated-types.ts`.
   - In the new types and interfaces, do not reference anything outside of `src/utils/telegram/generated-types.ts`.

3. **Formatting and style**
   - Order the interface in the same order they are listed in the page.

4. **Formatting and style**
   - Make sure the file has no TypeScript errors.
   - Make sure the file valid TypeScript.

This command is available in chat as `/generate-telegram-api`.

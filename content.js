async function deleteNextTweet() {
    // Find the first tweet article on the page.
    const tweet = document.querySelector('article[data-testid="tweet"]');

    if (!tweet) {
        alert("Finished deleting tweets. If more tweets have loaded, you can run the extension again.");
        console.log("Tweet Deleter: No more tweets found on the page.");
        return;
    }

    // Find the "more" button (caret) within the tweet.
    const moreButton = tweet.querySelector('div[data-testid="caret"]');

    // If there's no "more" button, it might be a promoted tweet or some other element.
    // We'll remove it from the DOM to avoid processing it again and move to the next one.
    if (!moreButton) {
        console.log("Tweet Deleter: Found a non-deletable item. Skipping.");
        tweet.remove();
        // Call the next iteration asynchronously.
        setTimeout(deleteNextTweet, 100);
        return;
    }

    moreButton.click();
    // Wait for the dropdown menu to appear.
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find the "Delete" option in the menu.
    // We search for the specific menu item role.
    const deleteMenuItem = Array.from(document.querySelectorAll('div[role="menuitem"]')).find(el => el.textContent === 'Delete');

    if (!deleteMenuItem) {
        console.log("Tweet Deleter: Could not find the 'Delete' button in the menu. Skipping this tweet.");
        // To avoid getting stuck, we'll remove the tweet from the view.
        tweet.remove();
        // Press escape to close any open menus.
        document.body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
        setTimeout(deleteNextTweet, 100);
        return;
    }

    deleteMenuItem.click();
    // Wait for the confirmation dialog to appear.
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find the confirmation button and click it.
    const confirmButton = document.querySelector('div[data-testid="confirmationSheetConfirm"]');

    if (!confirmButton) {
        console.log("Tweet Deleter: Could not find the confirmation delete button. Skipping this tweet.");
        tweet.remove();
        document.body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
        setTimeout(deleteNextTweet, 100);
        return;
    }

    confirmButton.click();
    console.log("Tweet Deleter: Tweet deletion confirmed. Waiting for UI to update...");

    // Add a longer delay to allow the UI to update and to avoid hitting rate limits.
    await new Promise(resolve => setTimeout(resolve, 1500));

    // After a successful deletion, call the function again to process the next tweet.
    deleteNextTweet();
}

console.log("Tweet Deleter: Starting the deletion process...");
alert('Starting to delete tweets. This may take a while. Check the console for progress.');
deleteNextTweet();
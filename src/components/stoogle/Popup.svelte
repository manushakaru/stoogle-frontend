<script>
  export let web = "";
  export let pageCount = 5;
  export let handlePopupSubmit;
  export let togglePopup;
</script>

<div class="popup">
  <div class="popupContent">
    <h3>Advanced Options</h3>
    <label>
      Website:
      <input type="text" bind:value={web} />
    </label>
    <label>
      Page Count:
      <input type="number" bind:value={pageCount} min="1" />
    </label>
    <div>
      <button on:click={handlePopupSubmit(web, pageCount)}>Submit</button>
      <button on:click={togglePopup} class="closeButton">Close</button>
    </div>
  </div>
</div>

<style>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popupContent {
    display: flex;
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: #333;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  .popupContent h3 {
    color: #303030; /* Title color */
    margin-top: 0;
    font-weight: bold;
  }

  .popupContent label {
    display: block;
    color: #333; /* Label color */
    margin-bottom: 10px;
    font-weight: bold;
  }

  .popupContent input {
    width: 250px;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #333; /* Input text color */
    background-color: #f1f1f1; /* Light background for inputs */
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .popupContent button {
    margin-right: 20px;
    padding: 8px 12px;
    background-color: #598ed5; /* Button background color */
    color: white; /* Button text color */
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .popupContent button:hover {
    background-color: #155bb5; /* Darker shade on hover */
  }

  /* Submit button styling */
  .popupContent button:not(.closeButton) {
    background-color: #598ed5; /* Submit button background color */
    color: white;
  }

  .popupContent button:not(.closeButton):hover {
    background-color: #155bb5; /* Darker shade on hover */
  }

  /* Close button styling */
  .popupContent .closeButton {
    background-color: #fd7b72; /* Red background for close button */
    color: white;
  }

  .popupContent .closeButton:hover {
    background-color: #d32f2f; /* Darker red on hover */
  }
</style>

<script>
  import { onMount } from "svelte";

  export let countryCode = "sg";

  // Get country code using IP-API
  const getCountryCode = async () => {
    try {
      const response = await fetch(
        "https://ip-api.com/json/?fields=countryCode"
      );
      const data = await response.json();
      countryCode = data.countryCode.toLowerCase();
    } catch (err) {
      console.error(err);
    }
  };

  onMount(async () => {
    await getCountryCode();
  });
</script>

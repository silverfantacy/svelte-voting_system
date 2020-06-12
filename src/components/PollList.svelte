<script>
  import PollDetails from "./PollDetails.svelte"
  export let polls = [];  // 承接父層參數
</script>

<style>
  .poll-list {
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px; 
  }
</style>

<div class="poll-list">
{#each polls as poll(poll.id)}
  <div>
    <!-- {poll.question} -->
    <PollDetails {poll} on:vote/>
    <!-- on:vote 來承接父子層的溝通 -->
  </div>
{/each}
</div>
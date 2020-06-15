<script>
  // import { onMount, onDestroy } from "svelte";  // 生命週期
  import { fade, slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import PollStore from "../stores/Polltore.js";
  import PollDetails from "./PollDetails.svelte";

  // export let polls = []; // 承接父層參數

  // const unsub = PollStore.subscribe(data => {
  //   // 使用 subscribe 取出 store 的值
  //   polls = data;
  // });

  // 生命週期
  // onMount(() => {
  //   console.log("component mounted");
  // });
  // onDestroy(() => {
  //   console.log("component destroyed");
  //   unsub();
  // });
</script>

<style>
  .poll-list {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
        padding: 0 20px;
      }
  @media screen and (min-width: 480px){
    .poll-list {
        grid-template-columns: 1fr 1fr;
        padding: 0;
      }
  }
</style>

<div class="poll-list">
  {#each $PollStore as poll (poll.id)}
    <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
      <PollDetails {poll} />
    </div>
  {/each}
</div>

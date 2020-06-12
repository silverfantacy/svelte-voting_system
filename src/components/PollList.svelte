<script>
  // import { onMount, onDestroy } from "svelte";  // 生命週期
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
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
</style>

<div class="poll-list">
  {#each $PollStore as poll (poll.id)}
    <div>
      <!-- {poll.question} -->
      <PollDetails {poll} on:vote />
      <!-- on:vote 來承接父子層的溝通 -->
    </div>
  {/each}
</div>

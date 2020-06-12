<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";
  import PollList from "./components/PollList.svelte";

  // tabs
  let items = ["Current Polls", "Add new Poll"];
  let activeItem = "Current Polls";

  const tabChange = e => {
    console.log("tabChange", e);
    activeItem = e.detail;
  };

  const handleAdd = e => {
    // 使用 store 後只負責跳轉
    activeItem = "Current Polls"; // 切換顯示元件
  };
</script>

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
</style>

<Header />
<main>

  <Tabs {activeItem} {items} on:tabChange={tabChange} />

  {#if activeItem === 'Current Polls'}
    <PollList />
  {:else if activeItem === 'Add new Poll'}
    <CreatePollForm on:add={handleAdd} />
  {/if}
</main>
<Footer />

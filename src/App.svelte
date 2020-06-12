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
    console.log("handleAdd", e);
    const poll = e.detail;
    polls = [poll, ...polls];
    console.log("polls", polls);
    activeItem = "Current Polls"; // 切換顯示元件
  };

  const handleVote = e => {
    const { id, option } = e.detail;

		let copiedPolls = [...polls];
		// 疑問？ 為什麼需要複製？
    console.log("test", copiedPolls[0] == polls[0]);
    let upvotedPoll = copiedPolls.find(poll => poll.id == id);

    if (option === "a") {
      upvotedPoll.votesA++;
    }
    if (option === "b") {
      upvotedPoll.votesB++;
    }

    polls = copiedPolls;
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
    <PollList on:vote={handleVote} />
  {:else if activeItem === 'Add new Poll'}
    <CreatePollForm on:add={handleAdd} />
  {/if}
</main>
<Footer />

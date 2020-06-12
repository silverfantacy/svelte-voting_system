<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";

  // tabs
  let items = ["Current Polls", "Add new Poll"];
  let activeItem = "Current Polls";

  const tabChange = e => {
    console.log("tabChange", e);
    activeItem = e.detail;
	};
	
	// polls
	let polls = [
		{
			id: 1,
			question: "馬自立今晚要直播的主題是？",
			anserA: "歌回",
			anserB: "雜談",
			votesA: 9,
			votesB: 15,
		}
	]

	const handleAdd = (e) => {
		console.log("handleAdd", e);
		const poll = e.detail;
		polls = [poll, ...polls];
		console.log("polls", polls);
		activeItem = "Current Polls"  // 切換顯示元件
	}
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
    <p>Poll list component goes here</p>
  {:else if activeItem === 'Add new Poll'}
		<CreatePollForm on:add="{handleAdd}" />
  {/if}
</main>
<Footer />

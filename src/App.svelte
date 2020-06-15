<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";
  import PollList from "./components/PollList.svelte";
  import PollStore from './stores/Polltore.js'

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


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  window.db = firebase.firestore().collection("Polls");

  // 啟動時取得 db 資料複寫
  let dbData = [];
  db.orderBy("id", "desc").get()
    .then(async (querySnapshot) => {
      // console.log('querySnapshot',querySnapshot)
      await querySnapshot.forEach(doc => {
        // console.log(doc.id, doc.data());
        dbData = [...dbData, doc.data()]
        
      });
      // await console.log('dbData',dbData);
      await PollStore.set(dbData)  // 把 dbDate 直接寫入 store
    })

    // 即時取得最新資料
    db.orderBy("id", "desc").onSnapshot(async querySnapshot => {
      dbData = [] // 清空初始資料
      await querySnapshot.forEach(doc => {
        // console.log('onSnapshot',doc.id, doc.data());
        dbData = [...dbData, doc.data()]
      });
      await PollStore.set(dbData)
    });

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

import { writable } from 'svelte/store';

const PollStore = writable(
  [
    {
      id: 1,
      question: "馬自立今晚要直播的主題是？",
      answerA: "歌回",
      answerB: "雜談",
      votesA: 9,
      votesB: 15
    },
  ]
);

export default PollStore;
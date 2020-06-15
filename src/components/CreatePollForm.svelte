<script>
  import PollStore from '../stores/Polltore.js'
  import { createEventDispatcher } from "svelte";
  import Button from "../shared/Button.svelte";

  const dispatch = createEventDispatcher();  // 呼叫父層function用

  let fields = {
    question: "",
    answerA: "",
    answerB: ""
  };
  let errors = {
    question: "",
    answerA: "",
    answerB: ""
  };
  let valid = false;

  const submitHandler = () => {
    console.log("submitHandler=>", fields);

    valid = true;

    // validate question
    if (fields.question.trim().length < 5) {
      valid = false;
      errors.question = "Question must be at least 5 characters";
    } else {
      errors.question = "";
    }

    // validate answer A
    if (fields.answerA.trim().length < 1) {
      valid = false;
      errors.answerA = "answer A cannnot be empty";
    } else {
      errors.answerA = "";
    }

    // validate answer B
    if (fields.answerB.trim().length < 1) {
      valid = false;
      errors.answerB = "answer B cannnot be empty";
    } else {
      errors.answerB = "";
    }

    // add new poll
    if (valid) {
      let poll = {...fields, votesA: 0, votesB: 0, id: Date.now()}
      // let poll = {...fields, votesA: 0, votesB: 0, id: Math.random()}
      // console.log("valid", fields);
      console.log("poll", poll);
      // dispatch('add', poll);

      // save poll to store, currentPolls是當前store內的值
      PollStore.update( currentPolls => {
        return [poll, ...currentPolls];
      })  //直接寫入 store

      // 寫入 db 紀錄
      db.doc(poll.id.toString()).set(JSON.parse(JSON.stringify(poll)))
        // .then((response) => console.log("db", response))
        // .catch((error) => console.log("db", error))

      dispatch('add');  // add 只負責跳轉了
    }
  };
</script>

<style>
  form {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
  }
  .form-field {
    margin: 18px auto;
  }
  input {
    width: 100%;
    border-radius: 6px;
  }
  label {
    margin: 10px auto;
    text-align: left;
  }
  .error {
    font-weight: bold;
    font-size: 12px;
    color: #d91b42;
  }
  
  @media screen and (min-width: 480px){
    form {
      padding: 0;
    }
  }
</style>

<form on:submit|preventDefault={submitHandler}>
  <div class="form-field">
    <label for="question">Poll question:</label>
    <input type="text" id="question" bind:value={fields.question} />
    <div class="error">{errors.question}</div>
  </div>
  <div class="form-field">
    <label for="answer-a">answer A:</label>
    <input type="text" id="answer-a" bind:value={fields.answerA} />
    <div class="error">{errors.answerA}</div>
  </div>
  <div class="form-field">
    <label for="answer-b">answer B:</label>
    <input type="text" id="answer-b" bind:value={fields.answerB} />
    <div class="error">{errors.answerB}</div>
  </div>

  <Button type="secondary" flat={true}>Add Poll</Button>
  <!-- <Button type="secondary" flat={true} inverse={true}>Add Poll</Button> -->
</form>

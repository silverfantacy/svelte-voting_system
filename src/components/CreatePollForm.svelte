<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../shared/Button.svelte";

  const dispatch = createEventDispatcher();  // 呼叫父層function用

  let fields = {
    question: "",
    anserA: "",
    anserB: ""
  };
  let errors = {
    question: "",
    anserA: "",
    anserB: ""
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

    // validate anser A
    if (fields.anserA.trim().length < 1) {
      valid = false;
      errors.anserA = "Anser A cannnot be empty";
    } else {
      errors.anserA = "";
    }

    // validate anser B
    if (fields.anserB.trim().length < 1) {
      valid = false;
      errors.anserB = "Anser B cannnot be empty";
    } else {
      errors.anserB = "";
    }

    // add new poll
    if (valid) {
      let poll = {...fields, votesA: 0, votesB: 0, id: Date.now()}
      // let poll = {...fields, votesA: 0, votesB: 0, id: Math.random()}
      // console.log("valid", fields);
      console.log("poll", poll);
      dispatch('add', poll);
    }
  };
</script>

<style>
  form {
    width: 400px;
    margin: 0 auto;
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
</style>

<form on:submit|preventDefault={submitHandler}>
  <div class="form-field">
    <label for="question">Poll question:</label>
    <input type="text" id="question" bind:value={fields.question} />
    <div class="error">{errors.question}</div>
  </div>
  <div class="form-field">
    <label for="anser-a">Anser A:</label>
    <input type="text" id="anser-a" bind:value={fields.anserA} />
    <div class="error">{errors.anserA}</div>
  </div>
  <div class="form-field">
    <label for="anser-b">Anser B:</label>
    <input type="text" id="anser-b" bind:value={fields.anserB} />
    <div class="error">{errors.anserB}</div>
  </div>

  <Button type="secondary" flat={true}>Add Poll</Button>
  <!-- <Button type="secondary" flat={true} inverse={true}>Add Poll</Button> -->
</form>

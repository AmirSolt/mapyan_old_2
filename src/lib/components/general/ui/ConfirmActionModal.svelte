<script lang="ts">

    import Modal from './Modal.svelte'

    export let showModal: boolean = false;
    export let prompt: string = "Are you sure?";
    export let confirmAction: () => void= ()=>{};
    export let cancelAction: () => void= ()=>{};

    function actionConfirmed(func){
        func();
        showModal=false;
    }

</script>


<Modal bind:showModal={showModal} coverScreen={false}>

    <p>
        {prompt}
    </p>

    <button class="btn variant-filled" on:click={()=>actionConfirmed(cancelAction)}>
        Cancel
    </button>

    <button class="btn variant-filled" on:click={()=>actionConfirmed(confirmAction)}>
        Confirm
    </button>


</Modal>
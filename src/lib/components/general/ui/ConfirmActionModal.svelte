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


<Modal bind:showModal={showModal} coverScreen={true}>

    <div class="flex justify-center items-center h-full w-full">

        <div class="flex flex-col justify-center items-center p-5">
    
            <p>
                {prompt}
            </p>
        <br>
        <br>
            <div class="flex gap-2">
                <button class="btn variant-filled" on:click={()=>actionConfirmed(cancelAction)}>
                    Cancel
                </button>
            
                <button class="btn variant-filled" on:click={()=>actionConfirmed(confirmAction)}>
                    Confirm
                </button>
            </div>
        </div>
    </div>



</Modal>
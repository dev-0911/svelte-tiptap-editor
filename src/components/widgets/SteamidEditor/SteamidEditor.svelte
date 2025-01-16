<script>
    import { TiptapCollabProvider } from "@hocuspocus/provider";
    import { Doc as YDoc } from "yjs";
    import TiptapEditor from "$components/features/TiptapEditor/TiptapEditor.svelte";
    import { onMount } from "svelte";

    import { getAuthToken, getTiptapCollabApiToken, getTiptapCollabAppToken, getTiptapConvertToken, getTiptapOpenAiToken } from "$lib/api/auth";
    import { userProfile } from "$lib/storage/userProfile";

    const collaborateDocPrefix = import.meta.env.VITE_TIPTAP_COLLABORATE_APP_ID;

    const collaborateAppId = import.meta.env.VITE_TIPTAP_COLLABORATE_APP_ID;
    const convertAppId = import.meta.env.VITE_TIPTAP_CONVERT_APP_ID;
    const aiAppId = import.meta.env.VITE_TIPTAP_AI_APP_ID;

    let provider;
    let convertToken;
    let collaborateToken;
    let aiToken;
    const yDoc = new YDoc();
    let inited = false;
    onMount(async () => {
        let data = await getAuthToken("dusan", "#!123Dus456#");
        let convertData = await getTiptapConvertToken("dusan", "#!123Dus456#");
        let collabAppData = await getTiptapCollabAppToken("dusan", "#!123Dus456#");
        let openAiData = await getTiptapOpenAiToken("dusan", "#!123Dus456#");
        // let collabApiData = await getTiptapCollabApiToken("dusan", "#!123Dus456#");
        collaborateToken = collabAppData.access_token;
        convertToken = convertData.access_token;
        aiToken = openAiData.access_token;

        console.log(collaborateToken);
        inited = true;
        provider = new TiptapCollabProvider({
            name: `${collaborateDocPrefix}-${1234}`,
            appId: collaborateAppId ?? "",
            token: collaborateToken,

            document: yDoc,
        });
        $userProfile = {
            id: "0123",
            username: "dusan",
            avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKZ3R3iR4_n47UHqAcVe-LqVJjfXYAp13nbjI7xh7BWcz5wPHw=s100",
            color: "#123456",
        };
    });
</script>

{#if !!provider}
    <TiptapEditor {provider} ydoc={yDoc} {convertAppId} {convertToken} {aiAppId} {aiToken} />
{/if}

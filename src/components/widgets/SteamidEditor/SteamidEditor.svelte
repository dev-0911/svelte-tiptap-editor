<script>
    import { TiptapCollabProvider } from "@hocuspocus/provider";
    import { Doc as YDoc } from "yjs";
    import TiptapEditor from "$components/features/TiptapEditor/TiptapEditor.svelte";

    const collaborateDocPrefix = import.meta.env.VITE_TIPTAP_COLLABORATE_APP_ID;
    const collaborateAppId = import.meta.env.VITE_TIPTAP_COLLABORATE_APP_ID;
    const collaborateToken = import.meta.env.VITE_TIPTAP_COLLABORATE_JWT_TOKEN;

    const yDoc = new YDoc();
    const provider = new TiptapCollabProvider({
        name: `${collaborateDocPrefix}-${1234}`,
        appId: collaborateAppId ?? "",
        token: collaborateToken,
        document: yDoc,
    });
</script>

<TiptapEditor {provider} ydoc={yDoc} />

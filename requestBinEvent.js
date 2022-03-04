// RequestBin doesn't seem to like fetch but supports axios so here we are.
import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    //Settings Object
    const settings = {
      "apiKey": "api-437988fb-739b-479b-bbd5-041bfeef07a5",
      "id":"618e44eabbda2a15aa1a88d6",
    }

    //onTrack as prescribed
    async function onTrack(event, settings) {
      const key = event;
      const userKey = steps.trigger.event.body[0].email;
      const properties = event.properties ? event.properties : {};
      const metricValue = 0;
      const creationDate = 0 + Date.parse(steps.trigger.context.ts);
      
      return await sendDataToLD(settings.id,[{
          kind: "custom",
          key,
          user: {
            key: userKey,
          },
          creationDate,
          metricValue,
          data: properties,
        }])
    }

    //sendDataToLD as prescribed
    async function sendDataToLD(id, eventArray) {
        const endpoint = `https://events.launchdarkly.com/events/bulk/${id}`;
        const res = await axios({
          url: endpoint,
          data: eventArray,
          headers: { "Content-Type": "application/json", },
          method: "POST",
        })

      console.log(res.config.data)
      return res.config.data
    }
  //steps.trigger.event.body[0] is the event details passed from the evaluation
  await onTrack(`email-${steps.trigger.event.body[0].event}`, settings);

  },
})
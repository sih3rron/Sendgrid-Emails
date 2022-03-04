import LaunchDarkly from 'launchdarkly-node-server-sdk';

export default defineComponent({
  async run({ steps, $ }) {
    const client = LaunchDarkly.init("sdk-cd7f87c5-0130-4a4f-a75c-07222c9cd59f");
    const context = {
      key: steps.trigger.event.body[0].email
    };

    const details = await client.variation("2022.Feb.Vegas.Email.TEMP", context, "msg2");
    console.log(details)
    client.track(`email-${steps.trigger.event.body[0].event}`);
    return steps.trigger.event.body[0].event
  },
})
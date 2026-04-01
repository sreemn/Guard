import { Client, GatewayIntentBits } from "discord.js";
import {
  Button,
  Container,
  File,
  MediaGallery,
  MediaGalleryItem,
  Section,
  Separator,
  TextDisplay,
} from "seyfert";
import { ButtonStyle, MessageFlags } from "seyfert/lib/types/index.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  const channel = await client.channels.fetch("channel id");

  if (!channel?.isTextBased()) {
    console.error("Channel not found or not a text channel.");
    return;
  }

  const components = new Container().addComponents(
    new MediaGallery().addItems(
      new MediaGalleryItem().setMedia("attachment://banner.png"),
    ),
    new TextDisplay().setContent(
      "## Introducing New Components for Messages!\nWe're bringing new components to messages that you can use in your apps. They allow you to have full control over the layout of your messages.\n\nOur previous components system, while functional, had limitations:\n- Content, attachments, embeds, and components had to follow fixed positioning rules\n- Visual styling options were limited\n\nOur new component system addresses these challenges with fully composable components that can be arranged and laid out in any order, allowing for a more flexible and visually appealing design. Check out the [changelog](https://discord.com/developers/docs/change-log) for more details.",
    ),
    new MediaGallery().addItems(
      new MediaGalleryItem().setMedia("attachment://hero.png"),
    ),
    new Section()
      .setComponents(
        new TextDisplay().setContent("A brief overview of components:"),
      )
      .setAccessory(
        new Button()
          .setStyle(ButtonStyle.Link)
          .setLabel("Overview")
          .setURL("https://discord.com/developers/docs/components/overview"),
      ),
    new Section()
      .setComponents(
        new TextDisplay().setContent("A list of all the components:"),
      )
      .setAccessory(
        new Button()
          .setStyle(ButtonStyle.Link)
          .setLabel("Reference")
          .setURL(
            "https://discord.com/developers/docs/components/reference#what-is-a-component-component-types",
          ),
      ),
    new Section()
      .setComponents(
        new TextDisplay().setContent("Get started with message components:"),
      )
      .setAccessory(
        new Button()
          .setStyle(ButtonStyle.Link)
          .setLabel("Guide")
          .setURL(
            "https://discord.com/developers/docs/components/using-message-components",
          ),
      ),
    new Separator(),
    new TextDisplay().setContent(
      "-# This message was composed using components, check out the request:",
    ),
    new File().setMedia("attachment://data.json"),
  );

  try {
    await channel.send({
      files: [
        { attachment: "./pics/banner.png", name: "banner.png" },
        { attachment: "./pics/hero.png", name: "hero.png" },
        { attachment: "./pics/data.json", name: "data.json" },
      ],
      flags: MessageFlags.IsComponentsV2,
      components: [components],
    });

    console.log("Message sent!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
});

client.login("Not leaking mine this time :)");

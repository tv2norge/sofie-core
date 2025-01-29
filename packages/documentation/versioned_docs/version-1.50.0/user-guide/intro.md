---
sidebar_label: Introduction
sidebar_position: 0
---

# Sofie User Guide

## Key Features

### Web-based GUI

![Producer's / Director's  View](/img/docs/Sofie_GUI_example.jpg)

![Warnings and notifications are displayed to the user in the GUI](/img/docs/warnings-and-notifications.png)

![The Host view, displaying time information and countdowns](/img/docs/host-view.png)

![The prompter view](/img/docs/prompter-view.png)

:::info
Tip: The different web views \(such as the host view and the prompter\) can easily be transmitted over an SDI signal using the HTML producer in [CasparCG](installation/installing-connections-and-additional-hardware/casparcg-server-installation.md).
:::

### Modular Device Control

Sofie controls playout devices \(such as vision and audio mixers, graphics and video playback\) via the Playout Gateway, using the [Timeline](concepts-and-architecture.md#timeline).  
The Playout Gateway controls the devices and keeps track of their state and statuses, and lets the user know via the GUI if something's wrong that can affect the show.

### _State-based Playout_

Sofie is using a state-based architecture to control playout. This means that each element in the show can be programmed independently - there's no need to take into account what has happened previously in the show; Sofie will make sure that the video is loaded and that the audio fader is tuned to the correct position, no matter what was played out previously.  
This allows the producer to skip ahead or move backwards in a show, without the fear of things going wrong on air.

### Modular Data Ingest

Sofie features a modular ingest data-flow, allowing multiple types of input data to base rundowns on. Currently there is support for [MOS-based](http://mosprotocol.com) systems such as ENPS and iNEWS, as well as [Google Spreadsheets](installation/installing-a-gateway/rundown-or-newsroom-system-connection/installing-sofie-with-google-spreadsheet-support), and more is in development.

### Blueprints

The [Blueprints](concepts-and-architecture.md#blueprints) are plugins to _Sofie_, which allows for customization and tailor-made show designs.
The blueprints are made different depending on how the input data \(rundowns\) look like, how the show-design look like, and what devices to control.

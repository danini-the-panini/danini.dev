---
title: Adjust iTunes volume from anywhere
publishedAt: 2014-03-28
tags: ["osx", "itunes", "applescript"]
---
Today I was listening to music on my mac at work, and wondered if there was a way to adjust iTunes volume with a shortcut key. Turns out there isn't one unless iTunes is in focus, and iTunes is generally not in focus.

So what's the reason for this? No particular reason, but I did figure out a way, and I thought I'd share it.

I grabbed some code from [Doug](http://dougscripts.com/itunes/itinfo/eqandvolume.php) who has iTunes-related AppleScripts on his website. I then proceeded to plonk the code into a couple of Automater services. The two scripts are as follows:

Volume Down:

```applescript
property volume_step : 10

tell application "iTunes"
  if the sound volume is greater than volume_step then
    set sound volume to (sound volume - volume_step)
  else
    set sound volume to 0
  end if
end tell
```

Volume Up:

```applescript
property volume_step : 10

tell application "iTunes"
  if the sound volume is less than 100 - volume_step then
    set sound volume to (sound volume + volume_step)
  else
    set sound volume to 100
  end if
end tell
```

If you haven't used Automater before, it's quite a neat program. I followed [some instructions on the web](http://veritrope.com/tech/the-basics-using-keyboard-shortcuts-with-applescripts/) about how to go about using it to make AppleScripts into keyboard shortcuts. It's quite simple really.

  1. Open automater
  2. Create a new service
  3. Set 'Service receives' to 'no input' (at the top of the workflow)
  4. Search for the 'Run AppleScript' action in the left pane
  5. Drag the 'Run AppleScript' action into the workflow
  6. Paste your AppleScript into the resulting text area
  7. Save the service as some meaningful name
  8. Open system preferences > keyboard > shortcuts
  9. Select 'Services' from the left pane
  10. Scroll down to 'General' and find your newly created services
  11. Add keyboard shortcuts for them.
  12. Log-out and back in again.

On my MacBook I made my keybaord shortcuts to be &#8984;F11 and &#8984;F12 for volume down and up respectively. The reason for this is that matches the existing volume keys and basically becomes &#8984;Fn+vol-down and &#8984;Fn+vol-up.

So that's that, now you can control your iTunes volume independently from anywhere using system-wide shortcut keys. Not sure why you would want to do this but it is a pretty neat trick.

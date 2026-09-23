# CleverKeys Handover

## Updating shop
  - Log in to Stripe account
  - Go to Products page
  - All changes made here will be reflected on the site
  - Archive a product in Stripe to remove from the site

## Updating site contents
  All the site's code is backed-up, so let me know if you need anything restored.

### Site text
  - Open folder "data"
  - Edit the file "siteContent.json"
  - Edit the section "textContent"
  - Add `<b>` before and `</b>` after a piece of text to make it bold
  - Add `<em>` before and `</em>` after a piece of text to make it italic
  - The current format has all book titles and branding in bold, with any other emphasised text in italics.
  - Add `<a href=\"site-address\">` before and `</a>` after a piece of text to turn it into a clickable link to "site-address"
  - Add `<br/>` to insert a line-break

### Updating Images
  - Open folder "site_images"
  - Upload your new image here
  - Make sure the new image is renamed exactly as the old one was

### Editing schools
  - Open folder "data"
  - Edit file "siteData.json"
  - To add an entry, add the details to the bottom of the file in the format:
  ```json
    {
      "name":     "School Name",
      "location": "Location",
      "site":     "full website name (optional)",
      "mail":     "email address (optional)",
      "phone":    "phone number (optional)",
      "desc":     "A description"
    }
  ```
  - Make sure that each entry has a comma "," after its closing curly bracket

### Editing worksheets
  - Open folder "data"
  - Edit file "siteContent.json"
  - Under the section "worksheetData"; to add an entry, add the details to the bottom of the file in the format:
  ```json
    {
      "page":  "the page number in the book",
      "title": "Title of exercise",
      "image": "name of image file"
    }
  ```
  - Make sure that each entry has a comma "," after its closing curly bracket
  - Return to the folder "public_html"
  - Open folder "worksheets"
  - Upload the worksheet image here.
  - Make sure the name of the worksheet image matches the image name given in the exerciseData.json entry

### Editing songs
  - Open folder "data"
  - Edit file "siteContent.json"
  - Under the section "songData", you can change the details fo each song here, with the format as:
  ```json
    {
      "url":  "name of song file",
      "name": "song title",
      // Optional - set song to 3/4 time,
      "time":  3,
      // Optional - beats per minute, defaults to 100
      "bpm": 110,
      // Optional - wait a number of beats before starting the audio
      "offset": 4,
      "notes": [
        {
          // Note A - G, for a rest leave as a blank ""
          "n": "A",
          // Optional - set note as sharp
          "s": true,
          // Optional - octave of note: 4, 5 or 6. Defaults to 4 (middle octave)
          "o": 5,
          // Note duration as a multiple of a quarter note: 0.5, 1, 2, 3 or 4. Defaults to 1
          "l": 3,
          // Optional - lyric to put under note.
          "l": "Good-",
        },
        ... // Repeat the content in the curly brackets above for each note
      ]
    }
  ```
  - Make sure that each entry has a comma "," after its closing curly bracket
  - To upload a new audio track, return to the folder "public_html"
  - Open folder "song_files"
  - Upload the new audio file here
  - Make sure the name of the audio file matches the url name given in the songData.json entry

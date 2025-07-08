1. src\server-rm\src\main\webapp\static\js contains helper code for delegated UIs. They rely significantly on the postMessage protocol specific to OSLC. See those file for impl details, section 4.3 in https://docs.oasis-open-projects.org/oslc-op/core/v3.0/os/dialogs.html#messaging_conformance for futher details and to src\server-rm\src\main\webapp\co\oslc\refimpl\rm\gen\creationdialogsampleclient.jsp for how it is used in a sample case. Your task is to extract a laser-focused small typescript module out of that code that assists with the OSLC postMessage communication and nothing else that is incidental. The module shall follow best practices and be prepared for both NPM and JSR publication. Put the code in src\oslc-postmessage-helper.
2. src\server-rm\src\main\webapp\co\oslc\refimpl\rm\gen\creationdialogsampleclient.jsp contains a sample client embedding and OSLC selection dialog and communicating with it via OSLC postMessage protocol to obtain OSLC information about selected OSLC resources. You should extract a WebComponent out of it that
    - uses either raw WebComponent and JS or uses the Lit framework
    - the component is a button, which, when clicked, displays a standard modal (https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) that displays an iframe of a passed OSLC selection dialog endpoint, uses the oslc-postmessage-helper for the OSLC postMessage communication and correctly unhooks when the selection was made or cancelled and provides and array of selected OSLC resources back to the user of the webcomponent.
    - is to be placed in src\oslc-selection-webcomponent
    - use modern typescript
3. a page to showcase the webcompoent
    - place it under src\oslc-selection-demo
    - use HTMX and a minimum JS necessary
    - when a selection is made, the dialog shall close and a UL list shall be shown for each selected resource
    - ideally, the webcomponent should be possible to load via a script reference without requiring a JS build in this project, to be indicative of how it can be loaded in a JSP page, for example

place your report under REPORT.md in each project and refrain from creating other markdown files. all markdown content shall go into those reports.
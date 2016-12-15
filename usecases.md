# Newsstream Usecases

Ziel: möglichst viele Fähigkeiten aus dem Projekt abzubilden:

Name|Auslöser| Informationsfluss
---|---|---
Alter| xx Jahre | NER    + Wikidata -> Jahre | RegEx + JSON -> Jahre 
Audio-Zitat | " xx _suchbegriff_ | NER + Audio Alignment Index -> Vorschlagliste 
  
 # API-Vorschlag
  
  Editor | Backend
  ----|----
  `POST text=...` | `[ {id: , name:, age: },  ... ]` für alle Entitäten im Text mit Geburtstadatum 
 `POST text=...`| Liste von Entitäten mit Audio-Fragmenten aus dem Archiv, die als Quelle einer der Entitäten aus dem Text haben und _suchbegriff_ enthalten 
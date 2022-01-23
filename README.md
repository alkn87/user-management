# user-management
FH Campus Wien - ASD - User Management

## CI Status

### Backend
![CI Backend](https://github.com/alkn87/user-management/actions/workflows/backend.yml/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/alkn87/user-management/branch/main/graph/badge.svg?token=EI23SSNO86&flag=backend)](https://codecov.io/gh/alkn87/user-management)

### Frontend
![CI Frontend](https://github.com/alkn87/user-management/actions/workflows/frontend.yml/badge.svg?branch=main)
[![codecov](https://codecov.io/gh/alkn87/user-management/branch/main/graph/badge.svg?token=EI23SSNO86&flag=frontend)](https://codecov.io/gh/alkn87/user-management)


## Einleitung

Im Zuge der Lehrveranstaltung "Advanced Software Development" soll ein User Manager entwickelt werden der folgende Anforderungen abdeckt:

100 | Der UserManager muss dem Benutzer die Möglichkeit bieten sich mit username und password anzumelden.

110 | Wenn username oder password nicht mit den gespeicherten übereinstimmen muss das System die Fehlermeldung „username oder password nicht korrekt“ ausgeben.

120 | Das System muss dem Benutzer drei Versuche zum Einloggen anbieten.

130 | Wenn der Benutzer angemeldet ist muss der UserManager dem Benutzer die Möglichkeit bieten das Kennwort zu ändern.

140 | Wenn der Benutzer das Kennwort ändert muss das System dem Benutzer die Möglichkeit bieten das neue Kennwort zweimal einzugeben.

150 | Wenn der Benutzer das Kennwort ändert und zweimal eingegeben hat muss das System die Kennwörter vergleichen.

160 | Wenn die verglichenen Kennwörter gleich sind muss das System das Kennwort aktualisieren

170 | Wenn die verglichenen Kennwörter ungleich sind muss das System die Fehlermeldung „Kennwörter nicht gleich ausgeben“.

180 | Wenn ein Benutzer eingeloggt ist muss das System dem Benutzer die Möglichkeit bieten seinen Account zu löschen.

190 | Wenn der Benutzer den Account löschen will muss der Benutzer eine Sicherheitsabfrage „Wollen Sie den Account wirklich löschen“ bestätigen

200 | Das System muss dem Benutzer die Möglichkeit bieten einen Account mit Vorname, Nachname, Benutzername und Kennwort anzulegen.

210 | Wenn der Benutzer einen neuen Account anlegen will muss das System auf Existenz des Usernames prüfen.

220 | Wenn der Username existiert muss das System die Meldung „Username existiert bereits“ ausgeben.

230 | Das System muss dem Benutzer die Möglichkeit bieten auszuloggen.



## Repository Struktur

Das Repository wird über ein Monorepo organisiert, in welchem alle Teilkomponenten des Projekts enthalten sind. So kann sichergestellt werden, dass jeder Entwickler zu jeder Zeit einen konsistenten Stand des Gesamtprojekts besitzen. Darüber hinaus kann durch die Wahl für ein Monorepo das Anlegen und das Mergen von Branches für Änderungen, die mehrere Teilprojekte umfasst vereinfacht werden. Das Monorepo unterteilt sich in unserem Repository in das Backend (user-manager-backend) und in das Frontend (user-manager-frontend). 

Sollte es beim kompelieren des Backends zu Problemen kommen, nutzen Sie folgenden Befehl (mvn clean install). 
Sollte es beim Frontend zu Problemen ("unable to resolve dependency tree") kommen, nutzen Sie folgenden Befehl (npm install -force)

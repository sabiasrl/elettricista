# TODO — FormSubmit (Richiedi un preventivo)

Passi da completare per attivare e configurare l’invio del form **Richiedi un preventivo** con [FormSubmit.co](https://formsubmit.co).

---

## 1. Sostituire l’email nel form

- **File:** `index.html`
- **Cosa fare:** Nell’attributo `action` del form `.quote-form` sostituisci l’indirizzo email con quello reale dove vuoi ricevere le richieste.

  **Attuale:**
  ```html
  action="https://formsubmit.co/info@lelettricistaditammonerocco.it"
  ```

  **Esempio:** se la tua email è `rocco.tammone@esempio.it`:
  ```html
  action="https://formsubmit.co/rocco.tammone@esempio.it"
  ```

---

## 2. Attivare l’email con FormSubmit (primo invio)

- Alla **prima richiesta** inviata dal sito, FormSubmit invia un’email di **conferma** all’indirizzo che hai messo nell’`action`.
- **Cosa fare:** Apri quella email e clicca sul link di attivazione.
- Solo dopo questa attivazione le richieste “Richiedi un preventivo” verranno inoltrate alla tua casella.

---

## 3. (Opzionale) Pagina / messaggio di ringraziamento

- Dopo l’invio, FormSubmit può reindirizzare l’utente a un URL di ringraziamento.
- **Cosa fare:** Aggiungi nel form (in `index.html`) un campo nascosto **prima** della chiusura di `<form>`:

  ```html
  <input type="hidden" name="_next" value="https://TUODOMINIO.it/#grazie">
  ```

  Sostituisci `https://TUODOMINIO.it` con l’URL reale del sito (es. `https://www.lelettricistaditammonerocco.it`).
- Se vuoi mostrare un messaggio “Grazie, ti contatteremo” sulla stessa pagina quando l’URL contiene `#grazie`, si può aggiungere in pagina un box che viene mostrato in quel caso (tramite CSS/JS).

---

## 4. (Opzionale) Verifica campi ricevuti

- I campi inviati sono: `name`, `email`, `phone`, `type`, `message`.
- L’oggetto dell’email è impostato con `_subject`: *"Nuova richiesta preventivo — L'Elettricista di Rocco Tammone"*.
- Dopo il primo invio reale, controlla in inbox che tutti i dati arrivino correttamente.

---

## Riepilogo

| Step | Obbligatorio | Descrizione |
|------|--------------|-------------|
| 1    | Sì           | Cambiare l’email nell’`action` del form in `index.html` |
| 2    | Sì           | Cliccare il link di attivazione nella prima email di FormSubmit |
| 3    | No           | Aggiungere `_next` per redirect alla pagina/messaggio di ringraziamento |
| 4    | No           | Verificare che le email arrivino con tutti i campi |

Quando hai completato almeno i passi 1 e 2, il form è operativo.

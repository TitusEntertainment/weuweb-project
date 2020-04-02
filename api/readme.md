# Projectplan webserver

Eddie Englund.

Målgruppen till hemsidan är proffesionella eller hobby musiker som letar efter bra hårdvara för att kunna göra sin musik.

Hemsidan kommer att kommunicera med apin på dessa sidor:

- Login
- Register
- Profile
- Kundvagn/checkout
- Feedback

Hemsidan kommer att använda sig av biblioteket som kallas för [axios](https://www.npmjs.com/package/axios) för att hantera POST och GET requests. Datan som kommer därifrån sparas i användarens lokala minne i browsern (inte all data). Det som sparas i den lokala browsern kommer att vara jwt (json web token) så att man sedan kan verifiera att det faktiskt är den användaren nästa gång användaren försöker göra något t.ex att betala eller posta en feedback i feedback sektionen.

Apin kommer endast att köras på samma datorn som hemsidan körs på och på så sätt så kan vi se till att apin inte är öppen för andra att använda. Dessutom så använder jag mig av det vanliga sättet att tänka som en dev. **LITA INTE PÅ ANVÄNDAREN**. Alltså, så sanerar jag allt som skickas in så att det inte skickas vidare js kod eller liknande. Alla användares lösenord kommer att bara hashade/saltade med [bcrypt](https://www.npmjs.com/package/bcrypt). Databasen kommer också att köras lokalt så den kommer inte ligga tillgänglig på internet så att ingen bara kan skicka queries till den.

Jag kommer att ha ett fåtal data modeller:

User:

id: Mongoose.Types.ObjectId (detta generar ett id som är unikt varje gång automatiskt); required
fullName: String (förnamn och efternamn); required min 2 char
password: String (hashed); required min 6 char
date: Date() (när den blev skapad)

Feedback:

userId: Mongoose.Types.ObjectId required (från User modellen)
id: Mongoose.Types.ObjectId required
date: Date() (när den blev skapad)
productId: Mongoose.Types.ObjectId required från produkt modellen

Product:
id: Mongoose.Types.ObjectId required
productname: String required
price: int required

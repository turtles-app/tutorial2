TODO

Step 1:
	-	Create rune1
		-	Create Rune Crafter
			-	Image
			-	Controller
		-	Create drag and and drop:
			-	Dragable directive
			-	Droppable directive
			-	Controller methods for dragging STONE & SIGIL
			-	Controller methods for dropping into RUNE CRAFTER
	-	Drag rune1 to drop zone
	-	Explain parts
		-	Stone1
		-	Sigil1

Step 2:
	-	Create Rune2
		-	Present Stone2
		-	Introduce active zone

Ruby
Topaz
Emerald
Sapphire
Amethyst
Quartz


STORYBOARD TEXT

EXPOSITION		1)	This is a Magic Stone. It can be used to forge a Sigil.	
<!-- Forge first Sigil -->
INSTRUCTION		2)	Drag Ruby into the Sigil Forge. 
EXPOSITION		3)	A Sigil resonates with the Stone(s) used to forge it.
INSTRUCTION		4)	To forge your Sigil, drag it into your Sigil Book
EXPOSITION		5)	You can choose to name your Sigil. Otherwise, we will give it a name for you. (Alpha)
					<!-- nicknaming Sigil -->
INSTRUCTION			5a) Enter the name of your new Sigil.
EXPOSITION		6)	You can craft a Rune by engraving one Sigil and embedding one Stone.
<!-- Craft first Rune -->
INSTRUCTION		7)	Drag Ruby and Alpha into the Rune Crafter.
EXPOSITION		8)	We know Alpha resonates with Ruby, so we can craft this Rune.
INSTRUCTION		9)	To craft your Rune, drag it into your Rune Scroll.
EXPOSITION		10)	You can craft a Rune if you forged the Sigil with that Stone, because you already know that they resonate. 
				<!-- better wording? Need to convey that a specific Rune can be crafted only if you KNOW the Stone resonates with the Sigil, and that you know they resonate if you forged the Sigil yourself -->
<!-- Forge second Sigil -->
INSTRUCTION		11)	Forge a new Sigil.
	*CASE*				11a)	Alpha (Alpha2):
		EXPOSITION			i)	Alpha2 resonates with the same Stone(s) as Alpha. Alpha2 and Alpha are the same!
		INSTRUCTION			ii) Make a different Sigil.
	*CASE*				11b)	Beta/Universe:
		EXPOSITION			i) Congratulations!
<!-- Craft second Rune, including error messages -->
INSTRUCTION		12)	Make a new Rune.
	*CASE*			12a)	Ruby in Alpha:
		EXPOSITION		i)	You already made this Rune! 
		INSTRUCTION		ii)	Make a different Rune.
	*CASE*			12b)	Ruby in Beta:
		*subcase*			i) True: 
			EXPOSITION		Great work! Huzzah!
		*subcase*			ii) False:	
			EXPOSITION		Ruby does not resonate with Beta. You forged Beta with only Topaz. 
			INSTRUCTION		Make a different Rune.
	*CASE*			12c)	Topaz in Alpha:	
		EXPOSITION		i)	Topaz does not resonate with Alpha. You forged Alpha with only Ruby. 
		INSTRUCTION		ii)	Make a different Rune.
	*CASE*			12d)	Topaz in Beta:	
		EXPOSITION		i)	Great work! Huzzah!
<!-- Introduce/use Inspector -->
EXPOSITION		13)	This is the inspector. It can be used to inspect different objects.
INSTRUCTION		14)	Drag a Rune into the Inspector.
	*CASE*			14a)	Stone: This is a Stone! Drag a Rune into the Inspector
	*CASE*			14b)	Sigil: This is a Sigil! Drag a Rune into the Inspector
	*CASE*			14c)	Rune: This Rune is engraved with *Sigil* and embedded with *Stone*
INSTRUCTION		15)	Drag a Sigil into the Inspector
	*CASE*			15a)	Stone: This is a Stone! Drag a Sigil into the Inspector
	*CASE*			15b)	Rune: This is a Rune! Drag a Sigil into the Inspector
	*CASE*			15c)	Sigil: This Sigil is forged with *Stones*, so it resonates with *Stones*
<!-- New stones, craft third Rune -->
EXPOSITION		16)	Here are some new Stones! Craft a Rune without using Ruby or Topaz.
INSTRUCTION		17)	You will need a new Sigil. Select the Sigil forger.
	*CASE*			16b)	Sigil has nothing but Ruby or Topaz: 
		EXPOSITION		i)	This Sigil is forged only with Ruby and/or Topaz! It is impossible to make a Rune using this Sigil without embedding Ruby or Topaz!
		INSTRUCTION		ii)	Make another Sigil.
	*CASE*			16c)	Sigil with at least one new Stone:
						i)	Great! Craft a Rune without using Ruby or Topaz.
INSTRUCTION		18)	Select the Rune Crafter.
	*CASE*			18a)	Player delay:	To craft a Rune, you first need to drag a Stone and a Sigil into the Rune Crafter.
	*CASE*			18b)	Further delay: To craft a Rune, drag the crafter into the Rune Scroll.

*CASE*			19a)	invalid Rune: This Rune cannot be crafted. *Stone* does not resonate with *Sigil*
*CASE*			19b)	Ruby or Topaz:	This is not the Rune we asked for. Craft a Rune without embedding Ruby or Topaz!
*CASE*			19c)	Correct:	Great! You have crafted a Rune without embedding Ruby or Topaz!

<!--  Craft fourth Rune -->
INSTRUCTION		20)	Make a new Rune embedded with a different Stone.


<!-- Introduce Inspector limitations on Sigil content after teaching Union -->


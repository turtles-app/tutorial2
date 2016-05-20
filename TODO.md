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

<!-- Stone names -->
Ruby
Topaz
Emerald
Sapphire
Amethyst
Quartz

<!-- Operation names -->
Fuse- Union
Trim - Intersection
Cleave - Difference
Core - Symmetric Difference



STORYBOARD TEXT
	//Once upon a time there was a book who spoke.

EXPOSITION		- This is a Magic Stone. It can be used to forge a Sigil.	
<!-- Forge first Sigil -->
INSTRUCTION		- Drag Ruby into the Sigil Forge. 
EXPOSITION		- A Sigil resonates with the Stone(s) used to forge it.
INSTRUCTION		- To forge your Sigil, drag it into your Sigil Book
EXPOSITION		- You can craft a Rune by engraving one Sigil and embedding one Stone.
<!-- Craft first Rune -->
INSTRUCTION		- Drag Ruby and Alpha into the Rune Crafter.
EXPOSITION		- We know Alpha resonates with Ruby, so we can craft this Rune.
INSTRUCTION		- To craft your Rune, drag it into your Rune Scroll.
EXPOSITION		- You can craft a Rune if you forged the Sigil with that Stone, because you already know that they resonate. 
				<!-- better wording? Need to convey that a specific Rune can be crafted only if you KNOW the Stone resonates with the Sigil, and that you know they resonate if you forged the Sigil yourself -->

<!-- Introduce Runic Key -->
EXPOSITION 		- This is a RUNIC KEY. It is an ordinary rune, but it has special properties. Use its power to unlock my secrets and traverse my pages. 

<!-- Introduce/use Inspector -->
EXPOSITION		- This is the inspector. It can be used to inspect different objects.
INSTRUCTION		- Drag the Runic Key into the Inspector.
<!-- INSPECTOR			*	Engraved with ANY Sigil EXCEPT Alpha and embedded with ANY Stone -->
<!-- Continued Inspection -->
EXPOSITION			*	You can drag other things into the Inspector
INSTRUCTION		- Drag a Rune into the Inspector.
	*CASE*			* Stone: This is a Stone! Drag a Rune into the Inspector
	*CASE*			* Sigil: This is a Sigil! Drag a Rune into the Inspector
	*CASE*			* Rune: This Rune is engraved with *SIGIL* and embedded with *STONE*
INSTRUCTION		- Drag a Sigil into the Inspector
	*CASE*			* Stone: This is a Stone! Drag a Sigil into the Inspector
	*CASE*			* Rune: This is a Rune! Drag a Sigil into the Inspector
	*CASE*			* Sigil: This Sigil is forged with *STONES*, so it resonates with *STONES*, and it is engraved in *RUNES*
INSTRUCTION		- Drag a Stone into the Inspector.
	*CASE*			* Rune: This is a Rune! Drag a Stone into the Inspector
	*CASE*			* Sigil: This is a Sigil! Drag a Stone into the Inspector
	*CASE*			* Stone: *STONE* resonates with *SIGILS* and is embedded in *RUNES*


<!-- Forge second Sigil -->
INSTRUCTION		- To craft the Runic Key, you'll need to Forge a new Sigil.
	*CASE*			* Alpha (Alpha2):
		EXPOSITION		i)	Alpha2 resonates with the same Stone(s) as Alpha. Alpha2 and Alpha are the same!
		INSTRUCTION		ii) Make a different Sigil.
	*CASE*			* Beta/Universe:
		EXPOSITION			i) Congratulations!

<!-- Craft second Rune, including error messages -->
INSTRUCTION		- Craft the Runic Key.
	<!-- On delay hints for Rune crafting -->
	*CASE*			* Ruby in Alpha:
		EXPOSITION		i)	You already made this Rune! 
		INSTRUCTION		ii)	Make a different Rune.
	*CASE*			* Ruby in Beta:
		*subcase*			i) True: 
			EXPOSITION		Great work! Huzzah!
		*subcase*			ii) False:	
			EXPOSITION		Ruby does not resonate with Beta. You forged Beta with only Topaz. 
			INSTRUCTION		Make a different Rune.
	*CASE*			* Topaz in Alpha:	
		EXPOSITION		i)	Topaz does not resonate with Alpha. You forged Alpha with only Ruby. 
		INSTRUCTION		ii)	Make a different Rune.
	*CASE*			* Topaz in Beta:	
		EXPOSITION		i)	Great work! Huzzah!

<!-- New stones, craft third Rune -->
EXPOSITION		- Here are some new Stones and a new Runic Key! 

<!-- Craft a Rune without Ruby or Topaz -->
INSTRUCTION		- This Runic Key has no Stone. Drag it to the inspector to learn more.
EXPOSITION		- You must craft a Rune engraved with (any stone except Ruby, or Topaz).
INSTRUCTION		- You will need a new Sigil. Select the Sigil forger.
	*CASE*			* Sigil has nothing but Ruby or Topaz: 
		EXPOSITION		i)	This Sigil is forged only with Ruby and/or Topaz! It is impossible to craft the Runic Key with this!
		INSTRUCTION		ii)	Forge another Sigil.
	*CASE*			* Sigil with at least one new Stone:
						i)	Great! Now craft the Runic Key!
INSTRUCTION		- Select the Rune Crafter.
					<!-- onDelay hints -->
	*CASE*			* Player delay:	To craft a Rune, you first need to drag a Stone and a Sigil into the Rune Crafter.
	*CASE*			* Further delay: To craft a Rune, drag the crafter into the Rune Scroll.

	*CASE*			* invalid Rune: This Rune cannot be crafted. *Stone* does not resonate with *Sigil*
	*CASE*			* Ruby or Topaz:	This is not the Runic Key. Craft the Runic Key!
	*CASE*			* Correct:	Great! You have crafted the Runic Key!

<!--  Craft fourth Rune -->
INSTRUCTION		- This Runic Key also has no Stone. Inspect it!
INSTRUCTION		- You must craft a Rune embedded with neither Ruby, Topaz, nor Emerald.

	*CASE*			* Player Delay: {{Hint}} Do you have the Sigil that you need?

<!-- Handle different hint responses -->

<!-- Crafting hints -->


<!-- Introducing Union -->
INSTRUCTION		*	This Runic Key is strange. Inspect it!
				<!-- Delay hints for Inspecting -->
EXPOSITION		*	You need a compound Sigil. To forge this one, FUSE two Sigils.

<!-- Introduce how to fuse Sigils -->

<!-- Craft Runes with Fused Sigils -->

<!-- You cannot select a justifying Rune until you have engraved the Sigil -->

<!-- Craft specific Runic key with specific Fused Sigil -->

<!-- Introduce Inspector limitations on Sigil content after teaching Union -->


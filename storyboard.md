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


EXPOSITION		- This is a MAGIC STONE. It can be used to forge a SIGIL.
<!-- Forge first Sigil -->
INSTRUCTION		- Oh, look! A SIGIL FORGE appeared! Drag the Sigil Forge into the WORKSPACE.
EXPOSITION		- Use the Sigil Forge to forge Sigils from Stones.
INSTRUCTION		- Drag *Ruby* into the Sigil Forge. 
EXPOSITION		- A Sigil resonates with the Stone(s) used to forge it.
INSTRUCTION		- To forge your Sigil, drag it into your Sigil Book
EXPOSITION		- Sigils and stones can be used to craft Runes.

<!-- Craft first Rune -->
INSTRUCTION		- How nice! A RUNE CRAFTER appeared! Drag the Rune Crafter into the Workspace.
EXPOSITION		- Craft a Rune by engraving a Sigil and embedding a Stone.
INSTRUCTION		- Drag *Ruby* and *Alpha* into the Rune Crafter.
EXPOSITION		- You know *Alpha* resonates with *Ruby*, so you can craft this Rune.
INSTRUCTION		- To craft your Rune, drag it into your Rune Scroll.
EXPOSITION		- You can craft a Rune if you forged the Sigil with that Stone, because you already know that they resonate. 
				<!-- better wording? Need to convey that a specific Rune can be crafted only if you KNOW the Stone resonates with the Sigil, and that you know they resonate if you forged the Sigil yourself -->

<!-- Introduce Runic Key -->
EXPOSITION 		- This is a RUNIC KEY. It is an ordinary rune, but you can use its power to unlock my secrets and traverse my pages. 

<!-- Introduce/use Inspector -->
EXPOSITION		- This is the inspector. It can be used to inspect different objects.
INSTRUCTION		- Drag the Runic Key into the Inspector.
<!-- INSPECTOR			*	Engraved with ANY Sigil EXCEPT Alpha and embedded with ANY Stone -->
<!-- Continued Inspection -->
EXPOSITION		- You can drag other things into the Inspector
INSTRUCTION		- Drag a Rune into the Inspector.
	*CASE*			* Stone: This is a Stone! Drag a Rune into the Inspector
	*CASE*			* Sigil: This is a Sigil! Drag a Rune into the Inspector
	*CASE*			* Tool: This is a Tool! Drag a Rune into the Inspector
	*CASE*			* Rune: This Rune is engraved with *SIGIL* and embedded with *STONE*
INSTRUCTION		- Drag a Sigil into the Inspector
	*CASE*			* Stone: This is a Stone! Drag a Sigil into the Inspector
	*CASE*			* Rune: This is a Rune! Drag a Sigil into the Inspector
	*CASE*			* Tool: This is a Tool! Drag a Sigil into the Inspector
	*CASE*			* Sigil: This Sigil is forged with *STONES*, so it resonates with *STONES*, and it is engraved in *RUNES*
INSTRUCTION		- Drag a Stone into the Inspector.
	*CASE*			* Rune: This is a Rune! Drag a Stone into the Inspector
	*CASE*			* Sigil: This is a Sigil! Drag a Stone into the Inspector
	*CASE*			* Tool: This is a Tool! Drag a Rune into the Inspector
	*CASE*			* Stone: *STONE* resonates with *SIGILS* and is embedded in *RUNES*
INSTRUCTION		- Drag a Tool into the Inspector
	*CASE*			* Rune: This is a Rune! Drag a Stone into the Inspector
	*CASE*			* Sigil: This is a Sigil! Drag a Stone into the Inspector
	*CASE*			* Stone: This is a Stone! Drag a Rune into the Inspector
	*CASE*			* Tool: This tool can be used to *Tool Purpose*


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
		*CASE*			i) True: 
			EXPOSITION		Great work! Huzzah!
		*CASE*			ii) False:	
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
	<!-- delay/mistakes -->
	*CASE*			* Player delay:	To craft a Rune, you first need to drag a Stone and a Sigil into the Rune Crafter.
	*CASE*			* Further delay: To craft a Rune, drag the crafter into the Rune Scroll.
	*CASE*			* invalid Rune: This Rune cannot be crafted. *Stone* does not resonate with *Sigil*
	*CASE*			* Ruby or Topaz:	This is not the Runic Key. Craft the Runic Key!
	*CASE*			* Correct:	Great! You have crafted the Runic Key!

<!--  Craft fourth Rune -->
INSTRUCTION		- This Runic Key also has no Stone. Inspect it!
##Inspector		- *Runic Key* is embedded with neither Ruby, Topaz, nor Emerald.
<!-- delay/mistakes -->
	*HINT*			* Do you have the Sigil that you need?
<!-- Handle different hint responses -->

<!-- Crafting hints -->

<!-- Introducing Union -->
INSTRUCTION		- This Runic Key is strange. Inspect it!
				<!-- Delay hints for Inspecting -->
EXPOSITION		- This Runic Key is engraved with a FUSED SIGIL.

INSTRUCTION		- Lucky you! A SIGIL FUSER appeared! Drag the Sigil Fuser into the Inspector.
EXPOSITION		- FUSE two Sigils to make a Fused Sigil. 
INSTRUCTION 	- Drag the Sigil Fuser into the Workspace.
EXPOSITION		- Any Sigil becomes a COMPONENT when you drag it into the Workspace. Use the Sigil Fuser to forge Sigils from Components.
INSTRUCTION		- DRAG two Sigils into the Sigil Fuser.
EXPOSITION		- All stones that resonate with either COMPONENT SIGIL also resonate with your Fused Sigil.
INSTRUCTION 	- Drag the Fuser into the Sigilspace to Fuse your components.
EXPOSITION		- Great Job! You made your first Fused Sigil! 
INSTRUCTION		- Drag the Fused Sigil into the Inspector.

##Inspector - *Fused Sigil* has components but no resonating Stones

<!-- popup to explain limitation of inspector -->
	POPUP		- This sigil has two component sigils.
				- Remember, ANY Stone that resonates with either *Component Sigils* resonates with *Fused Sigil*.
				- Wait, Why dont you see any resonating Stones?
				- The Inspector needs Runes to reveal which Stone(s) resonate with a Sigil.
				- Do you know which Stones resonate with *Fused Sigil*?
				- Click on a Stone that resonates with *Fused Sigil*.
		<!-- delay/mistakes -->
		*CASE* 			* delay/failure:
			INSTRUCTION		- Drag one of the Component Sigils into the Inspector.
			EXPOSITION		- *STONE* resonates with *Component Sigil*, so it also resonates with the *FUSED SIGIL*
		*CASE*			* Success: Success 
<!-- end of popup -->

EXPOSITION		- Now craft a Rune that corresponds with the Runic Key
INSTRUCTION		- Drag the Rune Crafter into the Workspace.
	<!-- delay/mistakes -->
	*CASE*		

<!-- Identify Stone needed for Fused Rune -->
EXPOSITION		- You need a Stone that resonates with *Fused Sigil*
INSTRUCTION		- Drag a Stone that resonates with *Fused Sigil* into the Rune Crafter
	<!-- delay/mistakes -->
	*CASE*			* You need a Stone that resonates with *Fused Sigil*. Inspect either Component Sigil to find one.
	*CASE*			* Success: Great! You have chosen *Stone* for the new Rune.

<!-- Identify Fused Sigil for Fused Rune -->
INSTRUCTION		- Drag *Fused Sigil* into the workspace
	<!-- delay/mistakes -->
	*CASE*			* not Sigil: This is not a Fused Sigil
	*CASE*			* wrong Sigil: You forged a Fused Sigil earlier and it is *FUSED SIGIL*
	*CASE*			* *Fused Sigil*: A new slot appeared! 

<!-- popup to explain need for justification/Component Rune -->
	POPUP		- To craft a Rune with a Fused Sigil, you need three Components: a Stone, a Fused Sigil, and another Rune.
				- You have engraved *Fused Sigil* and embedded *Stone*. You must also etch a component Rune.
	 			- The Component Rune must be engraved with one of the Components of *Fused Sigil* and embedded with the *Stone*.
	 			- Click on either Component of the Fused Sigil
	 			<!-- delay/mistakes -->
	 			- Click on an existing Rune that can be a component for the new Rune.
	 	<!-- delay/mistakes (looong) -->
	 	*CASE*		* Wrong Rune: 
	 		EXPOSITION		- This Rune is engraved with *some Sigil* and embedded with *some Stone*. 
	 		INSTRUCTION		- You need a Rune that is engraved with *correct Sigil* and embedded with *correct Stone*
	 	*CASE*		* Success: 
	 		EXPOSITION		- Great! This Rune is engraved with *correct Sigil* and embedded with *correct Stone*
	 		INSTRUCTION		- Finish crafting the Rune
<!-- end popup -->

<!-- Introduce new Runic Key -->
##
<!-- Inspect Components -->
<!-- Inspect Fused Sigil -->
<!-- Introduce Inspector limitations on Sigil content after teaching Union -->
<!-- Craft Runes with Fused Sigils -->

<!-- You cannot select a justifying Rune until you have engraved the Sigil -->

<!-- Craft specific Runic key with specific Fused Sigil -->


<!-- Introduce if x in AUB, x not in B, then x in A -->

